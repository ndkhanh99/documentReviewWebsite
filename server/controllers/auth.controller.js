const argon2 = require('argon2')
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const createError = require('../utils/errors');


// dung tam sau add redis sau :
let refreshTokens = []
const authController = {
    registerUser: async (req, res) => {
        const { name, email, password, role } = req.body
        // Simple validation :
        if (!email || !password || !name) {
            return res.status(400).json(createError(false, 'Thieu thong tin bat buoc'))
        }
        try {
            //  Kiem tra email da ton tai chua 
            const user = await User.findOne({ email: email })
            if (user) {
                return res.status(400).json(createError(false, 'Tai khoan da ton tai'))
            }

            // all good  :
            const hashPasword = await argon2.hash(password)
            const newUser = new User({
                name: name,
                email: email,
                password: hashPasword,
                role: role,
            })
            await newUser.save()

            res.status(200).json(createError(true, 'Tao TK thanh cong'))
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false, 'Loi he thong'))
        }
    },

    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign({
            userID: user._id,
            role: user.role,
            name : user.name,
            email : user.email
        }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '30d' }
        )
    },

    // GENERATE REFRESH TOKEN : 
    generateRefreshToken: (user) => {
        return jwt.sign({
            userID: user._id,
            role: user.role,
            name : user.name,
            email : user.email
        }, `${process.env.JWT_REFRESH_KEY}`,
            { expiresIn: '365d' })
    }
    ,
    loginUser: async (req, res) => {
        const { email, password ,pushtoken} = req.body
        // Simplate validation : 
        if (!email || !password) {
            return res.status(400).json(createError(false, 'Thiếu thông tin bắt buộc'));
        }

        try {
            // Kiem tra email co ton tai trong he thong khong ? 
            const user = await User.findOne({ email: email})

            if (!user) {
                return res.status(200).json(createError(false, 'Email hoặc mật khẩu không hợp lệ'))
            }

            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid) {
                return res.status(200).json(createError(false, 'Email hoặc mật khẩu không hợp lệ'))
            }
            if (pushtoken) {
                if (!user.pushtoken) {
                    // console.log(pushtoken)
                    const newUser = await User.findByIdAndUpdate(user.id,
                        {
                            pushtoken : pushtoken
                        })
                    
                }
                if (user.pushtoken !== pushtoken) {
                    await User.findByIdAndUpdate(user.id,{
                        pushtoken : pushtoken
                    })
                }
            }
            // all good  
            // return accToken
            const accessToken = authController.generateAccessToken(user)
            // return rfToken 
            const refreshToken = authController.generateRefreshToken(user)
            refreshTokens.push(refreshToken)
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: "strict"
            })
            let error = createError(true, 'Đăng nhập thành công')
            // console.log({...error,role : user.role, accessToken})
            res.status(200).json({ ...error, 
                                    role: user.role,
                                    name : user.name, 
                                    accessToken, 
                                    pushtoken
                                    })
        } catch (error) {
            console.log(error)
            return res.status(500).json(
                createError(false, 'Lỗi hệ thống')
            )
        }
    },
    requestRefreshToken: async (req, res) => {
        // Take refresh token from user
        const refreshToken = req.cookies.refreshToken
        console.log(refreshToken)
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh Token is not valid')
        }

        if (!refreshToken) return res.status(401).json("You're not authenticated")
        jwt.verify(refreshToken, `${process.env.JWT_REFRESH_KEY}`, (err, user) => {
            if (err) {
                console.log(err)
            }

            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)

            // Create new accress token , rf token
            const newAccessToken = authController.generateAccessToken(user);
            const newRfToken = authController.generateRefreshToken(user)

            res.cookie("refreshToken", newRfToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            })
            res.status(200).json({
                accessToken: newAccessToken
            })
        })

    },
    userLogout: async (req, res) => {
        res.clearCookie('refreshToken')
        refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken)
        res.status(200).json('Logged out !')
    },
    getAllUser: async (req, res) => {
        const {role} = req.query
        try {
            const listUsser = await User.find()
            if (!role) return res.status(200).json(listUsser)
            const listUserFilter = await User.find({
                role : role
            }) 
            return res.status(200).json(listUserFilter)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(
                createError(false, 'Loi he thong')
            )
        }
    },
    getUserInfoByID : async(req,res) => {
        const {userID} = req.params
        if (!userID) {
            return res.status(400).json(createError(false,'Thiếu thông tin bắt buộc'))
        }
        try {
            const userInfo = await User.findById(userID).select('role email name pushtoken avatar')
            if (!userInfo) {
                return res.status(400).json(createError(false,'Khong co thong tin user')) 
            }
            return res.status(200).json({...createError(true,'Lay thong tin user thanh cong'),userInfo})
        } catch (error) {
            console.log(error)
            return res.status(500).json(
                createError(false, 'Loi he thong')
            )
        }
    },
    updateUserInfo : async (req,res) => {
        const {userID} = req.params
        const {name,role} = req.body
        if (!userID) return res.status(400).json(createError(false,'Thiếu thông tin bắt buộc'))
        try {
            await User.findByIdAndUpdate(userID,{
                name : name,
                role : role
            })
            const newInfo = await User.findById(userID)
            return res.status(200).json({...createError(true,'Cập nhật thành công'),newInfo})
        } catch (error) {
            console.log(error)
            return res.status(500).json(
                createError(false, 'Loi he thong')
            )
        }
    },
    updatePassword : async (req,res) => {
        const {userID} = req.params
        const {oldPass, newPass} = req.body
        if (!userID || !oldPass || !newPass) return res.status(400).json(createError(false,'Thiếu thông tin bắt buộc'))
        try {
            const user = await User.findById(userID)
            const passwordValid = await argon2.verify(user.password, oldPass) 
            const hashNewPass = await argon2.hash(newPass)
            // Check mat khau cu co dung chua ?
            if (!passwordValid) return res.status(400).json(createError(false,'Mật khẩu không đúng'))
            // Check mat khau moi co giong mat khau cu khong ?
            if (oldPass === newPass) return res.status(400).json(createError(false,'Mật khẩu mới không được giống mật khẩu cũ'))
            // Neu khong roi 2 case trên thì bắt đầu thay đổi pass
            await User.findByIdAndUpdate(userID,{
                password : hashNewPass
            })
            return res.status(200).json(createError(true,'Cập nhật thành công'))
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(
                createError(false, 'Loi he thong')
            )
        }
    },
    updateNameRole : async (req,res) => {
        const {userID} = req.params
        const {newName,newRole} = req.body
        if (!userID || !newName || !newRole)  return res.status(400).json(createError(false,'Thieu thong tin bat buoc'))
        try {
            const user = await User.findById(userID)
            if (!user) return res.status(300).json(createError(createError(false,'Khong co user nay')))
            await User.findByIdAndUpdate(userID,{
                name : newName,
                role : newRole
            })
            const newUser = await User.findById(userID)
            return res.status(200).json({...createError(true,'Update thong tin thanh cong'),newUser})
        } catch (error) {
            console.log(error)
            return res.status(500).json(
                createError(false, 'Loi he thong')
            )
        }
    },
    deteleUser : async(req,res) => {
        const {userID} = req.params
        if (!userID) return res.status(400).json(createError(false,'Thiếu thông tin bắt buộc'))
        try {
            const user = await User.findById(userID)
            if (!user) return res.status(400).json(createError(false,'Khong co user'))
            await User.findByIdAndDelete(userID)
            .then(() => res.status(200).json(createError(true,'Xoa user thanh cong')))
            .catch(()=> res.status(400).json(createError(false,'Loi he thong')))
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(
                createError(false, 'Loi he thong')
            )
        }
    },
}

module.exports = authController;