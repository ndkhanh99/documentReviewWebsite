const mongoose = require('mongoose')
const DocumentModel = mongoose.Schema({
    code: {
        type: String,
        require: true
    },
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
    deleted: { 
        type: Boolean,      
        default : false },
    type : {
        type : mongoose.Types.ObjectId,
        require : true
    },
    dowloadCount : {
        type : Number,
        default : 0
    },
    note: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('documents', DocumentModel)