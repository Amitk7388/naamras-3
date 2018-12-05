const mongo = require('mongodb')
const mongoose = require('mongoose');
const db = mongoose.connection


mongoose.connect('mongodb://amitk7388:amit1101@ds163700.mlab.com:63700/naamras')

var userSchema = mongoose.Schema({
    name :{
        type: String
    },
    email : {
        type: String
    },
    password : {
        type : String
    },
    mobile : {
        type : String
    }

})

var Manager = module.exports = mongoose.model('manager', userSchema)