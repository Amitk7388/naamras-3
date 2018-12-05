const mongo = require('mongodb')
const mongoose = require('mongoose');

const db = mongoose.connection

mongoose.connect('mongodb://localhost/naamras');


var kirtanSchema = mongoose.Schema({
    kirtanName : {
        type: String
    }, 
    kirtanDate : {
        type: Date
    },
    imageName : {
        type: String
    },
    kirtanVenue :{
        type: String
    },
    kirtanHead : {
        type: String
    },
    kirtanPara :{
        type: String
    },
    startTime : {
        type: Date
    },
    endTime : {
        type : Date
    }, 
    fbLink : {
        type : String
    }, 
    achieveMent : {
        type : String
    }
})


Kirtan = module.exports = mongoose.model('kirtanManagement', kirtanSchema)

module.exports.createKirtans = function(newKirtans, callback){
                newKirtans.save(callback)    
}
