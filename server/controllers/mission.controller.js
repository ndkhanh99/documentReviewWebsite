const MissionModel = require('../models/mission.model')
const ChallengerModel = require('../models/challenger.model')
const createError = require('../utils/errors')

const missionController = {
    addMission : async (req, res) => {
        const {challengerID, des, note} = req.body
        if (!challengerID || !des) {
            return res.status(200).json(createError(false,'Thiếu thông tin bắt buộc'))
        }
        try {
            const newMission = new MissionModel({
                challengerID : challengerID,
                des : des,
                note : note
            })
            await newMission.save()
            res.status(200).json({...createError(true,'Thêm mới nhiệm vụ thành công'),newMission})
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false,'Lỗi hệ thống'))
        }
    },
    updateMission : async (req,res) => {
        const {missionID} = req.params
        const {des,note} = req.body
        try {
            const updateMission = await MissionModel.findByIdAndUpdate(missionID, {
                des : des,
                note : note
            }, {new : true})
            res.status(200).json({...createError(true,'Update thành công'),updateMission})
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false,'Lỗi hệ thống'))
        }
    },
    deleteMission : async (req,res) => {
        const {missionID} = req.params
        try {
            await MissionModel.findByIdAndDelete(missionID)
            res.status(200).json(createError(true,'Xoá nhiệm vụ thành công'))
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false,'Lỗi hệ thống'))
        }
    },
    getMissionByChallengerID : async (req,res) => {
        const {challengerID} = req.params
        try {
            const challenger = await ChallengerModel.findById(challengerID)
            if (!challenger) {
                return res.status.json(createError(false,'Không tồn tại thử thách'))
            }
            const listMission = await MissionModel.find({
                challengerID : challengerID
            })
            res.status(200).json({listMission,...createError(true,'Lấy danh sách nhiệm vụ thành công')})
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false,'Loi he thong'))
        }
    }
}


module.exports = missionController;