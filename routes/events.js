const express = require('express');
const router = express.Router();
const multer = require('multer');

var upload = multer({ dest: 'uploads/' })


var Events = require('..//models/event.js')

//  using multer for uploading files , the name of the tex area name => image
router.post('/eventmanagement', upload.single('image'),  function(req, res, next){
  
    let eventName = req.body.eventName;
    let eventDate = req.body.eventDate;
    let imageName = req.file.filename
    let eventVenue = req.body.eventVenue
    let eventHead = req.body.eventHead // this event head would be the event heading which should be in <h1> in html
    let eventPara = req.body.eventPara // this event Para is => event Paragraph which should be <p></p>  in html
    let startTime = req.body.startTime;// this would be the start time of the event
    let endTime = req.body.endTime // this would be for the end time of the event
    let fbLink = req.body.fbLink // this would be for the fb link show peaple can follow the person
    let achieveMent = req.body.achieveMent; // this would be aboout the discripion of the achievements


    // form validation of all the users input
    req.checkBody('eventName', 'please eneter the event name').notEmpty();
    req.checkBody('eventDate', 'please enter the event date').notEmpty();
    req.checkBody('image', 'please attached the image name').notEmpty();
    req.checkBody('eventVenue', 'please enter event venue').notEmpty();
    req.checkBody('eventHead', 'please enter the event Head').notEmpty();
    req.checkBody('eventPara', 'please eneter the eventPara').notEmpty();
    req.checkBody('startTime', 'please enter the start time of the event').notEmpty()
    req.checkBody('endTime', 'please enter the End Time of the event').notEmpty();
    req.checkBody('fbLink', 'please enter the Fb Link of the of the event').notEmpty()
    req.checkBody('achieveMent', 'please enter the achievements of the persion').notEmpty();



    // form validation errors request
    var errors = req.validationErrors();

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }
    else{
        newEvents = new Events({
            eventName : eventName,
            eventDate : eventDate,
            imageName : imageName,
            eventVenue : eventVenue,
            eventHead: eventHead,
            eventPara : eventPara,
            startTime : startTime,
            endTime : endTime,
            fbLink : fbLink,
            achieveMent: achieveMent,
        })
        Events.createEvents(newEvents, function(err, events){
            if(err){
                res.status(500).json({status:false, response:err, devMessage :'err while creating new Event'})
            }else{
                res.status(200).json({status:true, response:user})
            }
        })
    }

    
})


// to show all the details on this api page
router.get('/allevents', function(req, res, next){
    Events.find({}, function(err, allDetails){
        if(err){
            res.send('something went wrong')
        }
        else{
            res.json(allDetails)
        }
    })
})



// this is for the to get the data filtiring by date wise
router.get('/:eventdate/eventdetails', function(req, res, next){
    var date = req.params.eventdate

    Events.find({eventDate : date}, function(err, gotDetailsByDate){
        if(err){
            res.send('there is some issue get details')
        }else{
            res.json(gotDetailsByDate)
        }
    })

})


//-----------------------<CHANGE THE EVENT DETAILS --------------------------->--------------------->

// change Event Name from managers
router.post('/changeeventname/:id', function(req, res, next){
    var id = req.params.id
    var eventName = req.body.eventName
    req.checkBody('eventName', 'please enter the event Name').notEmpty();

    var errors = req.validationErrors()

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }else{
        Events.findByIdAndUpdate(id, {eventName : eventName}, function(err, changedDone){
            if(err){
                res.status(500).json({status:false, response:'there is some while update the event Name'})
            }else{
                res.status(200).json({status: true, response:'Event name has been updated sucessfully'})
            }
        })
    }
})


//this is for changing the event date
router.post('/changeeventdate/:id', function(req, res, next){
    var id = req.params.id
    var eventDate = req.body.eventDate

    req.checkBody('eventDate','please enter the date').notEmpty();

    var errors = req.validationErrors()

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }else{
        Events.findByIdAndUpdate(id, {eventDate : eventDate}, function(err, changedDone){
            if(err){
                res.status(500).json({status:false, response:'there is some while update the event Name'})
            }else{
                res.status(200).json({status: true, response:'Event name has been updated sucessfully'})
            }
        })
    }
})

// this for chaging the event image and name 
router.post('/changeevenimage/:id', upload.single('image'), function(req, res, next){
    var id = req.params.id
    var imageName = req.body.imageName

    req.checkBody('imageName', 'please attached the file')

    var errors = req.validationErrors()

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }else{
        TODO: // need to chek the filename after getting file type
        var imageNewName = req.file.fileName;
        Events.findByIdAndUpdate(id, {imageName : imageNewName}, function(err, changedDone){
            if(err){
                res.status(500).json({status:false, response:'there is some while update the event Name'})
            }else{
                res.status(200).json({status: true, response:'Event name has been updated sucessfully'})
            }
        })
    }
    
})

// this is for changing the event venue 
router.post('/changeeventvenue/:id', function(req, res, next){
    var id = req.params.id
    var eventVenue = req.body.eventVenue

    req.checkBody('eventVenue', 'please eter the venue name')

    var errors = req.validationErrors()

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }else{

       Events.findByIdAndUpdate(id, {eventVenue : eventVenue}, function(err, changedDone){
        if(err){
            res.status(500).json({status:false, response:'there is some while update the event Name'})
        }else{
            res.status(200).json({status: true, response:'Event name has been updated sucessfully'})
        }
    })
}
})

// this is to change the event heading 
router.post('/changeeventhead/:id', function(req, res, next){
    var id = req.params.id
    var eventHead = req.body.eventHead

    req.checkBody('eventHead', 'please eter the venue name')

    var errors = req.validationErrors()

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }else{
       Events.findByIdAndUpdate(id, {eventHead : eventHead}, function(err, changedDone){
            if(err){
                res.status(500).json({status:false, response:'there is some while update the event Name'})
            }else{
                res.status(200).json({status: true, response:'Event name has been updated sucessfully'})
            }
    })
    }
})


// this is for changing event paragraph 
router.post('/changeeventpara/:id', function(req, res, next){
    var id = req.params.id
    var eventPara = req.body.eventPara

    req.checkBody('eventPara', 'please eter the venue name')

    var errors = req.validationErrors()

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }else{
        Events.findByIdAndUpdate(id, {eventPara : eventPara}, function(err, changedDone){
            if(err){
                res.status(500).json({status:false, response:'there is some while update the event Name'})
            }else{
                res.status(200).json({status: true, response:'Event name has been updated sucessfully'})
            }
    })
    }
})


//------------------------->DELETING THE EVENTS DETAILS ---------------------------------------------->

// this is for the delete option from the database no need to save this 
router.post('/deleteevents/:id', function(req, res, next){
    var id = req.params.id

    Events.findByIdAndDelete(id, function(err, chengedDone){
        if(err){
            res.status(500).json({status: false, response: 'there is some issue to delete the id\'s'})
        }else{
            res.status(200).json({status: true, response: 'the event has been deleted sucessfulll' })
        }
    })
})


module.exports = router;

