const express = require('express')
const missionController = require('../controllers/mission.controller')
const router = express.Router()
const {verifyAdmin, verifyToken, verifyTokenGVandAdmin} = require('../middleware/auth.middleware')


// add mission
router.post('/', missionController.addMission)
router.put('/:missionID', missionController.updateMission)
router.delete('/:missionID', missionController.deleteMission)
router.get('/getmissionbychallenger/:challengerID', missionController.getMissionByChallengerID)

module.exports = router;