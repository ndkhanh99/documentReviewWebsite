const { timeStamp } = require('console')
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    role : {
        type : String,
        enum : ['admin', 'normal','vip1', 'vip2','vip3'],
        default :   'normal'
    },
    avatar: {
        type : String,
        default : 'https://firebasestorage.googleapis.com/v0/b/pib-client.appspot.com/o/images%2Favatardef.png?alt=media&token=57bfd8c6-54e0-41a4-baa8-cebe9544b4b6'
    },
    download : {
        type : Number,
        default : 0
    },
    document : {
        type : [Object],
        require : true
    }
},{timestamps : true})

module.exports = mongoose.model('users', UserSchema)