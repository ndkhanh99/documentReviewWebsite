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

const uploadFileController = {
    storeFiles: (req, res) => {
        try {
            const file = req.newFile
            console.log('waiting');
            upload.single(file);
            res.status(200).json({ result: true, msg: 'file uploaded' });
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false, 'Loi he thong'))
        }
    }
}

module.exports = uploadFileController;
