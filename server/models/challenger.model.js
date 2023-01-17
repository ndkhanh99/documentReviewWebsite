const mongoose = require('mongoose');
const ChallengerModel = mongoose.Schema({
    classID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Class',
        require : true
    },
    type : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'challengerType'
    },
    name : {
        type : String,
        require : true
    },
    note : {
        type : String
    },
    sentStatus : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

module.exports = mongoose.model('challengers', ChallengerModel)