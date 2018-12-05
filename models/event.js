const mongo = require('mongodb')
const mongoose = require('mongoose');

const db = mongoose.connection

mongoose.connect('mongodb://localhost/naamras');


var eventSchema = mongoose.Schema({
    eventName : {
        type: String
    }, 
    eventDate : {
        type: Date
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


Events = module.exports = mongoose.model('eventManagement', eventSchema)

module.exports.createEvents = function(newEvents, callback){
                newEvents.save(callback)    
}
