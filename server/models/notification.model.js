const mongoose = require('mongoose');
const NotificationModel = mongoose.Schema({
    description : {
        type : String,
        require : true
    },
    challengerID : {
        type : String,
        // ref : 'challengers'
    },
    seenStatus : {
        type : Boolean,
        default : false
    },
    navigation : {
        type : String,
        require : true
    },
    to : {
        type : mongoose.Types.ObjectId,
        ref : 'users'
    }
},{timestamps : true})

module.exports = mongoose.model('notification', NotificationModel)