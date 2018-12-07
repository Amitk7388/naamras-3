const mongo = require('mongodb')
const mongoose = require('mongoose');

const db = mongoose.connection

mongoose.connect('mongodb://amitk7388:amit1101@ds163700.mlab.com:63700/naamras')


var kirtanSchema = mongoose.Schema({
    kirtanName : {
        type: String
    }, 
    kirtanDate : {
        type: String
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
        type: String
    },
    endTime : {
        type : String
    }, 
    fbLink : {
        type : String
    }, 
    achieveMent : {
        type : String
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
})


Kirtan = module.exports = mongoose.model('kirtanManagement', kirtanSchema)

module.exports.createKirtans = function(newKirtans, callback){
                newKirtans.save(callback)    
}
