const mongo = require('mongodb')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = mongoose.connection;

mongoose.connect('mongodb://amitk7388:amit1101@ds163700.mlab.com:63700/naamras');

var imageSchema = mongoose.Schema({
    userImage :{
        type: String
    },
    userDescript:{
        type : String
    },
    status : {
        type : String
    }
})


var UserImages = module.exports = mongoose.model('userImage', imageSchema)


module.exports.createUserImage = function(newUserImages, callback){
            newUserImages.save(callback)
}