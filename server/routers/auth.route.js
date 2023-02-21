const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { verifyAdmin, verifyToken } = require('../middleware/auth.middleware')
const middleware = require('../middleware/auth.middleware')

// @route POST api/ath/register
// @desc Register user
// @access Public

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/refresh', authController.requestRefreshToken)
router.get('/listuser', middleware.verifyAdmin, authController.getAllUser)
router.get('/:userID', middleware.verifyToken, authController.getUserInfoByID)
router.put('/:userID', middleware.verifyToken, authController.updateUserInfo)
router.put('/changePass/:userID', middleware.verifyToken, authController.updatePassword)
router.put('/updatenamerole/:userID', verifyAdmin, authController.updateNameRole)
router.delete('/:userID', verifyAdmin, authController.deteleUser)
router.post('/update', authController.updateUserDetails)





module.exports = router;