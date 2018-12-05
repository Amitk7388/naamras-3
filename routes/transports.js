const express = require('express');
const router = express.Router();

let Transports = require('..//models/transport')

//-------------------------< HANDLING TRANPORTATION DATA -------------------------------->
router.post('/transportmanagement/api', function(req, res, next){
    
    // taking this variable from the form of this
    let transportDate =  req.body.transportDate; // this would be for the date of t transport where bus can go accordingly
    let busTime = req.body.busTime; // bus Time text box name - frontend
    let busNum = req.body.busNum; // bus number name of text box-frontend
    let busFrom = req.body.busFrom; // bus from name of tex box -frontend
    let busDest = req.body.busDest; // bus destination of text box name - frontend

    // check form validation from express validator
    req.checkBody('transportDate', 'please enter the date of the bus').notEmpty();
    req.checkBody('busTime', 'please enter the bus timing').notEmpty();
    req.checkBody('busNum', 'please enter the bus number ').notEmpty();
    req.checkBody('busFrom', 'please enter the from where bus will start').notEmpty();
    req.checkBody('busDest', 'please enterbus destination').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        console.log(errors);
        res.status(500).json({status: false, response: errors, devMessage : 'There is some issue while form validtion from users'})
    }else{
        var newTransport = new Transports({
            transportDate:transportDate,
            busTime : busTime,
            busNum : busNum,
            busFrom : busFrom,
            busDest : busDest
        });

        Transports.createTransport(newTransport, function(err, transportDone){
            if(err){
                res.status(500).json({status: false, response : err, devMessage:'There is some issue while creating the new object tranport data'});
            }else{
                console.log(transportDone);
                res.status(200).json({status: true, response: transportDone, devMessage : 'transport object has been created'});
            }
            
        });
    };

});


//-------------------------------------->FETCH TRANSPORTAION DATA<------------------------------------
router.get('/showtranportationdetails/api', function(req, res, next){
    Transports.find({}, function(err, allDetails){
        if(err){
            console.log(err);
            res.status(500).json({status:false, response:err, devMessage: 'there is some issue while fetching the data'});
        }else{
            console.log(allDetails);
            res.status(200).json({status:true, response: allDetails, devMessage: 'data had been fetched'});
        }
    });
});

// fetching the date accordingly by date

router.get('/:transportDate/transports/api', function(req, res, next){
    var transportDate = req.params.transportDate;

    Transports.find({transportDate : transportDate}, function(err, allDetails){
        if(err){
            console.log(err)
            res.status(500).json({status:false, response:err, devMessage: 'there is some error while fetching the data by date'})
        }else{
            res.status(200).json({status:true, response:allDetails, devMessage:' the data has been fetched by date'})
        }
    })
})


// fetching the date accordingly by from place buses
router.get('/:transportfrom/api', function(req, res, next){
    var transportFrom = req.params.transportfrom
    Transports.find({busFrom : transportFrom}, function(err, allDetails){
        if(err){
            res.status(500).json({status:false, response:err, devMessage: 'there is some error while fetching the data by date'})
        }else{
            res.status(200).json({status:true, response:allDetails, devMessage:' the data has been fetched by date'})
        }
    })
})

// fetching the data by destination transports
router.get('/:transportdest/api', function(req, res, next){
    var transportDest = req.params.transportdest
    Transports.find({busDest : transportDest}, function(err, allDetails){
        if(err){
            res.status(500).json({status:false, response:err, devMessage: 'there is some error while fetching the data by date'})
        }else{
            res.status(200).json({status:true, response:allDetails, devMessage:' the data has been fetched by date'})
        }
    })
})


//------------------>updating the transport data data----------------->
router.post('/:id/tranport/api', function(req, res, next){
    let id = req.params.id
    let transportDate =  req.body.transportDate; // this would be for the date of t transport where bus can go accordingly
    let busTime = req.body.busTime; // bus Time text box name - frontend
    let busNum = req.body.busNum; // bus number name of text box-frontend
    let busFrom = req.body.busFrom; // bus from name of tex box -frontend
    let busDest = req.body.busDest;

    // check form validation from express validator
    req.checkBody('transportDate', 'please enter the date of the bus').notEmpty();
    req.checkBody('busTime', 'please enter the bus timing').notEmpty();
    req.checkBody('busNum', 'please enter the bus number ').notEmpty();
    req.checkBody('busFrom', 'please enter the from where bus will start').notEmpty();
    req.checkBody('busDest', 'please enterbus destination').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        console.log(errors);
        res.status(500).json({status: false, response: errors, devMessage : 'There is some issue while form validtion from users'})
    }else{
        Transports.findByIdAndUpdate(id, {transportDate:transportDate,
                                          busTime : busTime,
                                          busNum : busNum,
                                          busFrom : busFrom,
                                          busDest : busDest}, 
        function(err, Updated){ // this is callback function to get updated and get the data in "Updated"
            if(err){
                console.log(err)
                res.status(500).json({status:false, response:err, devMessage:'issue while updatingmany thing'})
            }else{
                console.log('updated succesfully')
                res.status(200).json({status:true, response:Updated, devMessage:'updated succesfully'})
            }

        })
    }

})


//<-----------------------------<deleting the details---------------------------------------------------->


router.post('/:id/deletedetails/api', function(req, res, next){
    let id = req.params.id;

    Transports.findByIdAndDelete(id, function(err, itemDeleted){
        if(err){
            console.log(err)
            res.status(500).json({status:false, response:err, devMessage:'issue while deleting many thing'});
        }else{
            console.log('updated succesfully')
            res.status(200).json({status:true, response:itemDeleted, devMessage:'deleted succesfully'});
        }
    })

})





module.exports = router;