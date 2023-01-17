const express = require('express');
const ClassController = require('../controllers/class.controller');

const router = express.Router()
const {verifyAdmin, verifyTokenGVandAdmin} = require('../middleware/auth.middleware')


router.post('/',verifyAdmin, ClassController.addClass)
router.get('/', verifyAdmin,ClassController.getListClass)
router.get('/:id',verifyAdmin,ClassController.getClass),
router.put('/:id',verifyAdmin,ClassController.editClass)
router.delete('/:id',verifyAdmin, ClassController.deleteClass)
router.get('/getclassmentor/:userID',ClassController.getClassByMentor)
router.post('/addStudent/:classID',verifyAdmin,ClassController.addStudent)
router.get('/getclass_student/:userID',ClassController.getClassByStudent)



module.exports = router;