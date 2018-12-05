const mongo = require('mongodb')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = mongoose.connection
var dotenv = require('dotenv').config()


mongoose.connect('mongodb://localhost/naamras');

//creating the Schema for the endusers to get all the details from the form adn it save in schema
var userSchema = mongoose.Schema({
    name :{
        type : String,
        index : true,
    },
    email : {
        type : String
    },
    mobile : {
        type : String
    },
    password : {
        type : String
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    
    facebook : [{
        id :{
            type : String
        },
        accessToken: {
            type : String
        },
        name:{
            type : String,
        },
        email : {
            type : String
        }
    }],

    google : [{
        id :{
            type : String
        },
        accessToken: {
            type : String
        },
        name:{
            type : String,
        },
        email : {
            type : String
        }
    }]
})

//

// find email id from databse 
module.exports.findUserByEmail = function(email,callback){
    var query = {email : email}
    EndUser.findOne(query, callback)
}

module.exports.getUserById = function(id, callback){
    EndUser.findOne(id, callback)
}

// this is for comparing the password of the bcrypt
module.exports.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch,){
    if(err){
        console.log(err)
        console.log('some err found while compararion bcrypt password')
        return callback(err)
    }
    else{
        console.log('ismatch')
        return callback(null, isMatch)
    }    
    })
}


// creating the collection whre the end users data will save in endUser save by the name of ===> endUsers
var EndUser = module.exports = mongoose.model('endUser', userSchema)



module.exports.createEndUser = function(newEndUser, callback){
    //hasing the passwornd here with saltRound of 10 as mentoned in the callback function 
    bcrypt.hash(newEndUser.password, 10, function(err, hash){
         if(err){
            return status(500).json({status :false, response : err , devMessage : 'there is some issue while hasing the password'});
         }

         else if(!hash){
             return status(400).json({status : true, response : err, devMessage : 'the has not been created'});
         }else{
             //once the newEndUser data will and and once hashing willbe don it save the data in collection as mentioned above
            newEndUser.password = hash;
            console.log(hash)
            newEndUser.save(callback);
         };
     });
    
 } ;

 module.exports.createFacebookUser = function(newEndUser, callback){
        newEndUser.save(callback)
 } 
 
 
module.exports.createGoogleUser = function(newEndUser, callback){
    newEndUser.save(callback)
} 
// finding the user email

module.exports.findUserByEmail = function(email, callback){
    EndUser.findOne({email : email}, callback)
}