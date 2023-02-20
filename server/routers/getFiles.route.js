const express = require('express');
const FileController = require('../controllers/file.controller');
const router = express.Router()
const { verifyAdmin, verifyTokenGVandAdmin } = require('../middleware/auth.middleware')

router.get('/', FileController.getAllFiles);
router.post('/download', FileController.downloadFile);
router.post('/doctype', verifyAdmin, FileController.addNewDocType)
router.get('/doctype', FileController.getAllDocType)
router.post('/doc', FileController.addNewDocument)
router.get('/doc', FileController.getALlDoc)
router.post('/doc/count', FileController.countSeen)
router.get('/filter', FileController.getDocByType)



module.exports = router;