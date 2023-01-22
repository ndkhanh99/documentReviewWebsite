const express = require('express');
const router = express.Router();
const uploadFileController = require('../controllers/uploadFile.controller')
// const { verifyAdmin, verifyToken } = require('../middleware/auth.middleware')
// const middleware = require('../middleware/auth.middleware')

// @route POST api/ath/register
// @desc Register user
// @access Public

router.post("/upload", (req, res) => {
    // use modules such as express-fileupload, Multer, Busboy

    setTimeout(() => {
        console.log('file uploaded')
        return res.status(200).json({ result: true, msg: 'file uploaded' });
    }, 3000);
});

router.delete("/upload", (req, res) => {
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});




module.exports = router;