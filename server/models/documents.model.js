const mongoose = require('mongoose')
const DocumentModel = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    des: {
        type: String,
        require: false,
    },
    uploadBy: {
        type: Number,
        require: false,
    },
    deleted: { type: Boolean },
    type : {
        type : mongoose.Types.ObjectId,
        require : true
    },
    dowloadCount : {
        type : Number
    },
    note: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('documents', DocumentModel)