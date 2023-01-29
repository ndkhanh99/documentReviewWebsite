const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files');
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, originalname);
    }
});
const upload = multer({ storage });
const router = express.Router();
const uploadFileController = require('../controllers/uploadFile.controller')
const Documents = require('../models/documents.model');

router.post("/upload", upload.single('newFile'), (req, res) => {
    // console.log(req.file.filename);
    const newFile = new Documents({
        name: req.file.filename,
        uploadBy: 1,
    });
    newFile.save().then(
        setTimeout(() => {
            console.log('file uploaded')
            return res.status(200).json({ result: true, msg: 'file uploaded' });
        }, 3000)
    );

});

router.delete("/upload", (req, res) => {
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});




module.exports = router;