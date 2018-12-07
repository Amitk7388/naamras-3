const mongo = require('mongodb')
const mongoose = require('mongoose');

const db = mongoose.connection

mongoose.connect('mongodb://localhost/naamras');

var calenderSchema = mongoose.Schema({
    calenderName : {
        type : String,
        required : true
    },
    calenderDate : {
        type: String,
        required : true
    },
    calenderStartTime : {
        type: String,
        required : true

    },
    calenderEndTime : {
        type: String,
        required : true
    }
})


var Calender = module.exports = mongoose.model('calender', calenderSchema);

module.exports.createCalenderEvents = function(newCalenderEvents, callback){
        newCalenderEvents.save(callback);
}