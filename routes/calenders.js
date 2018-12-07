var express = require('express');
var router = express.Router();


let Calender = require('..//models/calender')


//==========================<filling calenders form data with >=================================<

router.post('/events/api', function(req, res, next){
    // taking the vairables from req.body object
    console.log(req.body)
    let calenderName = req.body.calenderName;
    let calenderDate = req.body.calenderDate;
    let calenderStartTime = req.body.calenderStartTime;
    let calenderEndTime = req.body.calenderEndTime;

        //form validation of req.body via express validator
    req.checkBody('calenderName', 'please fill the calneder name').notEmpty();
    req.checkBody('calenderDate', 'please fill details of calender Date').notEmpty();
    req.checkBody('calenderStartTime', 'please fill the details of Calender Start Time').notEmpty();
    req.checkBody('calenderEndTime', 'please fill the details of the Calender End Time').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.status(500).json({status: false, response : errors, devMessage : 'there is some while validating forms request' })
    }else{
        console.log('work 1')
        var newCalenderEvents = new Calender({
            calenderName : calenderName,
            calenderDate :calenderDate,
            calenderStartTime : calenderStartTime,
            calenderEndTime :calenderEndTime
        })
        console.log('work2'+newCalenderEvents)

        Calender.createCalenderEvents(newCalenderEvents, function(err, calenderCreated){
            if(err){
                res.status(500).json({status: false, response:err, devMessage : 'there is some issue! while creating the calender creating !'})
            }else{
                res.status(200).json({status:true, response: calenderCreated, devMessage:'calender events succesfully created'})
            }
        })
    }

})


//<==========================<fetching calender evenets data <============================

router.get('/allCalenderDetails/api', function(req, res, next){
    
    Calender.find({}, function(err, dataFetched){
        if(err){
            res.status(500).json({status:false, response: err, devMessage: 'there is some wihile fetching the data of all calander events'})
        }else{
            res.status(200).json({status:200, response: dataFetched, devMessage:'data fetched sucessfully'})
        }
    })

})


module.exports = router;