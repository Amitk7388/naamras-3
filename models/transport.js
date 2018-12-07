const mongo = require('mongodb')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = mongoose.connection;


mongoose.connect('mongodb://amitk7388:amit1101@ds163700.mlab.com:63700/naamras')


var transportSchema = mongoose.Schema({
    transportDate : {
        type : String
    },
    busTime : {
        type : String
    },
    busNum : {
        type : String
    },
    busFrom : {
        type : String
    },
    busDest : { 
        type : String
    }

})


Transports = module.exports = mongoose.model('tranport', transportSchema);

module.exports.createTransport = function(newTransport, callback){
                newTransport.save(callback)
}