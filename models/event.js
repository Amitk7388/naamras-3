const mongo = require('mongodb')
const mongoose = require('mongoose');

const db = mongoose.connection

mongoose.connect('mongodb://amitk7388:amit1101@ds163700.mlab.com:63700/naamras')


var eventSchema = mongoose.Schema({
    eventName : {
        type: String
    }, 
    eventDate : {
        type: String
    },
    imageName : {
        type: String
    },
    eventVenue :{
        type: String
    },
    eventHead : {
        type: String
    },
    eventPara :{
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
    }
})


Events = module.exports = mongoose.model('eventManagement', eventSchema)

module.exports.createEvents = function(newEvents, callback){
                newEvents.save(callback)    
}
