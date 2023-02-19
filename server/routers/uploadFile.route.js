const express = require('express');
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files');
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        const {name, ext} = path.parse(file.originalname)
        cb(null, `${name}${ext}`);
    }
});
const upload = multer({storage });
const router = express.Router();
const Documents = require('../models/documents.model');


router.post("/upload", upload.single('newFile'), 
    (req, res) => {
    Documents.find().sort({ _id: -1 }).limit(1).then((result) => {
        newfilename = result[0].name;
        // const filter = { name: newfilename };
        // const update = { name: req.file.filename, delete: true };
        doc = Documents.findOneAndUpdate({ name: newfilename }, { des: req.file.filename }, { delete: true });
        res.send(result);

    }).catch((err) => {
        console.log(err);
    });

});

router.delete("/upload", (req, res) => {
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});




module.exports = router;