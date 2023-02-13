const multer = require('multer');
const Files = require('../models/documents.model');
const DocType = require('../models/docType.model')
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
    },
    addNewDocument: (req, res) => {
        try {

        } catch (error) {

        }
    },
    addNewDocType: async (req, res) => {
        const { code, name ,note} = req.body
        // console.log('---------------',req)
        if (!code || !name) {
            return res.status(400).json(createError(false, 'Thieu thong tin bat buoc'))
        }
        try {
            //  Kiem tra ma tai lieu da ton tai hay chua
            const docType = await DocType.findOne({ code: code })
            if (docType) {
                return res.status(400).json(createError(false, 'Tai khoan da ton tai'))
            }
            // all good  :
            const newDocType = new DocType({
                code: code,
                name: name,
                note: note
            })
            await newDocType.save()

            res.status(200).json(createError(true, 'Tao TK thanh cong'))
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false, 'Loi he thong'))
        }
    }
}

module.exports = FileController;
