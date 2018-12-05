const mongo = require('mongodb')
const mongoose = require('mongoose');
const db = mongoose.connection

console.log('model 2 is working ')
mongoose.connect('mongodb://localhost/naamras');

console.log('model 1 is working')
var userSchema = mongoose.Schema({
    name : {
        type : String,
        index : true
    },
    email : {
        type : String,
        
    },
    
    purpose : {
        type : String
    },

    mobile : {
        type : String
        
    },
   

     
})

var User = module.exports = mongoose.model('volentiarsData', userSchema);
module.exports.createUser = function (newUser, callback){
    newUser.save(callback)
    console.log('this is newUser' + newUser)
}




