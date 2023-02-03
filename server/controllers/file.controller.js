const multer = require('multer');
const Files = require('../models/documents.model');

const FileController = {
    getAllFiles: (req, res) => {
        try {
            Files.find().then((result) => {
                res.send(result);
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false, 'Loi he thong'))
        }
    }
}

module.exports = FileController;
