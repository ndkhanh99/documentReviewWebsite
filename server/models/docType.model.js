const mongoose = require('mongoose')
const DocTypeModel = mongoose.Schema({
    code : {
        type : String,
        require : true,
        unique : true
    },
    name : {
        type : String,
        require : true
    },
    note : {
        type : String
    }
},{timestamps : true})

module.exports = mongoose.model('DocType',DocTypeModel)