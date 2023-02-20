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
    },
    addNewDocument: async (req, res) => {
        const { code, name, type, des, note, downloadMode } = req.body
        if (!code || !name || !type) {
            return res.status(400).json(createError(false, 'Thieu thong tin bat buoc'))
        }
        try {
            const doc = await Files.findOne({ code: code })
            if (doc) {
                return res.status(400).json(createError(false, 'Tai lieu da ton tai'))
            }
            const newDoc = new Files({
                code: code,
                name: name,
                des: des,
                type: type,
                note: note,
                downloadMode: downloadMode
            })
            await newDoc.save()
            return res.status(200).json(createError(true, 'Luu tai lieu thanh cong'))
        } catch (error) {
            console.log(error);
            res.status(500).json(createError(false, 'Loi He thong'));
        }
    },
    addNewDocType: async (req, res) => {
        const { code, name, note } = req.body
        if (!code || !name) {
            return res.status(400).json(createError(false, 'Thieu thong tin bat buoc'))
        }
        try {
            //  Kiem tra ma tai lieu da ton tai hay chua
            const docType = await DocType.findOne({ code: code })
            if (docType) {
                return res.status(400).json(createError(false, 'Loai tai lieu da ton tai'))
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
    },
    getAllDocType: async (req, res) => {
        try {
            const listDocType = await DocType.find()
            return res.status(200).json(listDocType)
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false, 'Loi he thong'))
        }
    },
    getALlDoc: async (req, res) => {
        try {
            const listDocument = await Files.find()
            return res.status(200).json(listDocument)
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false, 'Loi he thong'))
        }
    },
    getDocByType: async (req, res) => {
        try {
            console.log(req.query.foo);
            const docTypeID = req.query.foo;
            const listDocument = await Files.find({ type: docTypeID });
            return res.status(200).json(listDocument)
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false, 'Loi he thong'))
        }
    },
    countSeen : async (req,res ) => {
        const {id} = req.body
        if (!id) {
            return res.status(400).json(createError(false, 'Thieu thong tin bat buoc'))
        }
        try {
            const Doc = await Files.findById(id)
            const newCount = Doc.seenCount + 1
            await Files.findByIdAndUpdate(id,{
                seenCount : newCount
            })
            return res.status(200).json('Update count')
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false, 'Loi he thong'))
        }
    }
}

module.exports = FileController;
