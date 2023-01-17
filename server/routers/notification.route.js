const express = require('express')
const router = express.Router()
const {verifyToken, verifyTokenGVandAdmin, verifyAdmin} = require('../middleware/auth.middleware')
const NotificationController = require('../controllers/notification.controller')

// @route POST api/ath/register
// @desc Register user
// @access Public

router.post(`/addNotification/:challengerID`,NotificationController.addNotification)
router.get('/getNotificationTo/:to',NotificationController.getNotificationTo)
router.put(`/:id`,NotificationController.udpateStatus)



module.exports = router;