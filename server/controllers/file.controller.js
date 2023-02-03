const multer = require('multer');
const Files = require('../models/documents.model');
const createError = require('../utils/errors');

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
    },
    downloadFile: (req, res) => {
        try {
            console.log(req.body.filesname);
            filename = req.body.filesname;
            res.download('files/' + filename);
        } catch (error) {
            console.log(error);
            res.status(500).json(createError(false, 'Loi He thong'));
        }
        // const newBook = {
        //     BookID: req.body.bookID,
        //     Title: req.body.bookTitle,
        //     Author: req.body.bookAuthor,
        //   };
    }
}

module.exports = FileController;
