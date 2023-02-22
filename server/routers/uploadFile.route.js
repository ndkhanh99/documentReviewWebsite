const express = require('express');
const multer = require('multer');
const path = require('path');
const { verifyAdmin, verifyToken } = require('../middleware/auth.middleware')
const middleware = require('../middleware/auth.middleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files');
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        const { name, ext } = path.parse(file.originalname)
        cb(null, `${name}${ext}`);
    }
});
const upload = multer({ storage });
const router = express.Router();
const Documents = require('../models/documents.model');
const User = require('../models/user.model');

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

// upload user avatar
router.post("/upload/avatar", middleware.verifyToken, upload.single('avatar'),
    (req, res) => {
        const userId = req.body.userId;
        // User.findById(userId).then((result) => {
        //     userEmail = result.email;
        //     user = User.findOneAndUpdate({ email: userEmail }, { avatar: req.file.filename }).then((result) => res.send(result));
        // }).catch((err) => {
        //     console.log(err);
        // });
        user = User.findOneAndUpdate({ _id: userId }, { avatar: req.file.filename }).then((user) => res.send(user));

    });



module.exports = router;