const express = require('express');
const PerformanceController = require('../controllers/performance.controller');
const router = express.Router()
const {verifyToken, verifyTokenGVandAdmin, verifyAdmin} = require('../middleware/auth.middleware')

// @route POST api/ath/register
// @desc Register user
// @access Public


// Performance : 
// router.get(`/`, (res)=>res.status(200).json('Performance API'))
router.post('/', PerformanceController.addPerformance)
router.get(`/getby_student/:studentID`,PerformanceController.getPerformancebyStudent)
router.put(`/updateStatus/:id`,PerformanceController.updatePerformace)



module.exports = router;