const jwt = require('jsonwebtoken');
const createError = require('../utils/errors');

const middlewareAuth = {
    verifyToken: (req, res, next) => {
        const authHeader = req.header('Authorization');
        // console.log(authHeader);
        const token = !authHeader ? req.body.headers.Authorization : authHeader && authHeader.split(' ')[1]
        // console.log('check token',token)

        if (!token) {
            return res.status(403).json(createError(false, 'Khong ton tai access token'));
        }
        try {
            const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);

            req.userID = decoded.userID
            req.role = decoded.role
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json(createError(false, 'Access Token sai'))
        }
    },
    verifyTokenGVandAdmin: (req, res, next) => {
        middlewareAuth.verifyToken(req, res, () => {
            if (req.role === 'GV' || req.role === 'admin') {
                next()
            } else {
                return res.status(403).json(createError(false, 'Khong co quyen thao tac chuc nang nay'))
            }
        })
    },
    verifyAdmin: (req, res, next) => {
        middlewareAuth.verifyToken(req, res, () => {
            if (req.role === 'admin') {
                next()
            } else {
                return res.status(403).json(createError(false, 'Khong co quyen thao tac chuc nang nay'))
            }
        })
    },
}

module.exports = middlewareAuth;