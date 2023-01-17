const notificationModel = require('../models/notification.model')
const createError = require('../utils/errors')

const NotificationController = {
    addNotification : async (req,res) => {
        const {description,navigation,to} = req.body
        console.log(req.body)
        const {challengerID} = req.params
        if (!description ||!navigation || !challengerID) {
            return res.status(400).json(createError(false,'Thiếu thông tin bắt buộc'))
        }
        try {
            const newNotification = new notificationModel({
                description : description,
                navigation : navigation,
                challengerID : challengerID,
                to : to
            })
            await newNotification.save()
            return res.status(200).json(createError(true,'Them notification thanh cong'))
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false,'Loi he thong'))
        }
    },
    getNotificationTo : async (req,res) => {
        const {to} = req.params
        if (!to) {
            return res.status(400).json(createError(false,'Thiếu thông tin bắt buộc'))
        }
        try {
            const notificationList = await notificationModel.find({
                to : to
            })
            return res.status(200).json({...createError(true,'Get Notification thanh cong'),notificationList})
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false,'Loi he thong'))
        }
    },
    udpateStatus : async (req,res) => {
        const {id} = req.params
        if (!id) {
            return res.status(400).json(createError(false,'Thiếu thông tin bắt buộc'))
        }
        try {
            const newItem = await notificationModel.findByIdAndUpdate(id,{
                seenStatus : true
            })
            return res.status(200).json(createError(true,'Update thanh cong'))
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false,'Loi he thong'))
        }
    }
}


module.exports = NotificationController;