const mongo = require('mongodb')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = mongoose.connection;


mongoose.connect('mongodb://localhost/naamras');


var transportSchema = mongoose.Schema({
    transportDate : {
        type : Date
    },
    busTime : {
        type : Date
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