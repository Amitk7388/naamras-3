const express = require('express');
const router = express.Router();
const multer = require('multer');

var upload = multer({ dest: 'uploads/' })


var Kirtan = require('..//models/kirtan')

//  using multer for uploading files , the name of the tex area name => image
router.post('/kirtanmanagement', upload.single('image'),  function(req, res, next){
  
    let kirtanName = req.body.kirtanName;
    let kirtanDate = req.body.kirtanDate;
    let imageName = req.file.filename
    let kirtanVenue = req.body.kirtanVenue
    let kirtanHead = req.body.kirtanHead // this kirtan head would be the kirtan heading which should be in <h1> in html
    let kirtanPara = req.body.kirtanPara // this kirtan Paragraph is => kirtan Paragraph which should be <p></p>  in html
    let startTime = req.body.startTime;// this would be the start time of the kirtan
    let endTime = req.body.endTime // this would be for the end time of the kirtan
    let fbLink = req.body.fbLink // this would be for the fb link show peaple can follow the person
    let achieveMent = req.body.achieveMent; // this would be aboout the discripion of the achievements


    // form validation of all the users input
    req.checkBody('kirtanName', 'please eneter the kirtan name').notEmpty();
    req.checkBody('kirtanDate', 'please enter the kirtan date').notEmpty();
    req.checkBody('image', 'please attached the kirtan name').notEmpty();
    req.checkBody('kirtanVenue', 'please enter kirtan venue').notEmpty();
    req.checkBody('kirtanHead', 'please enter the kirtan Head').notEmpty();
    req.checkBody('kirtanPara', 'please eneter the kirtanPara').notEmpty();
    req.checkBody('startTime', 'please enter the start time of the kirtan').notEmpty()
    req.checkBody('endTime', 'please enter the End Time of the kirtan').notEmpty();
    req.checkBody('fbLink', 'please enter the Fb Link of the of the kirtan').notEmpty()
    req.checkBody('achieveMent', 'please enter the achievements of the person').notEmpty();



    // form validation errors request
    var errors = req.validationErrors();

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }
    else{
        newKirtans = new Kirtan({
            kirtanName : kirtanName,
            kirtanDate : kirtanDate,
            imageName : imageName,
            kirtanVenue : kirtanVenue,
            kirtanHead: kirtanHead,
            kirtanPara : kirtanPara,
            startTime : startTime,
            endTime : endTime,
            fbLink : fbLink,
            achieveMent: achieveMent,
        })
        Kirtan.createKirtans(newkirtans, function(err, kirtans){
            if(err){
                res.status(500).json({status:false, response:err, devMessage :'err while creating new kirtan'})
            }else{
                res.status(200).json({status:true, response:kirtans})
            }
        })
    }

    
})


// to show all the details on this api page
router.get('/allkirtans', function(req, res, next){
    Kirtan.find({}, function(err, allDetails){
        if(err){
            res.send('something went wrong')
        }
        else{
            res.json(allDetails)
        }
    })
})



// this is for the to get the data filtiring by date wise
router.get('/:kirtandate/kirtandetails', function(req, res, next){
    var date = req.params.kirtandate

    Kirtan.find({kirtanDate : date}, function(err, gotDetailsByDate){
        if(err){
            res.send('there is some issue get details')
        }else{
            res.json(gotDetailsByDate)
        }
    })

})


//-----------------------<CHANGE THE KIRTAN  DETAILS --------------------------->--------------------->

// change kirtan Name from managers
router.post('/changekirtanname/:id', function(req, res, next){
    var id = req.params.id
    var kirtanName = req.body.kirtanName
    req.checkBody('kirtanName', 'please enter the kirtan Name').notEmpty();

    var errors = req.validationErrors()

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }else{
        Kirtan.findByIdAndUpdate(id, {kirtanName : kirtanName}, function(err, changedDone){
            if(err){
                res.status(500).json({status:false, response:'there is some while update the kirtan Name'})
            }else{
                res.status(200).json({status: true, response:'kirtan name has been updated sucessfully'})
            }
        })
    }
})


//this is for changing the kirtan date
router.post('/changekirtandate/:id', function(req, res, next){
    var id = req.params.id
    var kirtanDate = req.body.kirtanDate

    req.checkBody('kirtanDate','please enter the date').notEmpty();

    var errors = req.validationErrors()

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }else{
        Kirtan.findByIdAndUpdate(id, {kirtanDate : kirtanDate}, function(err, changedDone){
            if(err){
                res.status(500).json({status:false, response:'there is some while update the kirtan Name'})
            }else{
                res.status(200).json({status: true, response:'kirtan name has been updated sucessfully'})
            }
        })
    }
})

// this for chaging the kirtan image and name 
router.post('/changekirtanimage/:id', upload.single('image'), function(req, res, next){
    var id = req.params.id
    var imageName = req.body.imageName

    req.checkBody('imageName', 'please attached the file')

    var errors = req.validationErrors()

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }else{
        TODO: // need to chek the filename after getting file type
        var imageNewName = req.file.fileName;
        Kirtan.findByIdAndUpdate(id, {imageName : imageNewName}, function(err, changedDone){
            if(err){
                res.status(500).json({status:false, response:'there is some while update the kirtan Name'})
            }else{
                res.status(200).json({status: true, response:'kirtan name has been updated sucessfully'})
            }
        })
    }
    
})

// this is for changing the kirtan venue 
router.post('/changekirtanvenue/:id', function(req, res, next){
    var id = req.params.id
    var kirtanVenue = req.body.kirtanVenue

    req.checkBody('kirtanVenue', 'please enter the kirtan venue')

    var errors = req.validationErrors()

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }else{

       Kirtan.findByIdAndUpdate(id, {kirtanVenue : kirtanVenue}, function(err, changedDone){
        if(err){
            res.status(500).json({status:false, response:'there is some while update the kirtan Name'})
        }else{
            res.status(200).json({status: true, response:'kirtan name has been updated sucessfully'})
        }
    })
}
})

// this is to change the kirtan heading 
router.post('/changekirtanhead/:id', function(req, res, next){
    var id = req.params.id
    var kirtanHead = req.body.kirtanHead

    req.checkBody('kirtanHead', 'please enter the kirtan  heading name')

    var errors = req.validationErrors()

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }else{
       Kirtan.findByIdAndUpdate(id, {kirtanHead : kirtanHead}, function(err, changedDone){
            if(err){
                res.status(500).json({status:false, response:'there is some while update the kirtan Name'})
            }else{
                res.status(200).json({status: true, response:'Kirtan name has been updated sucessfully'})
            }
    })
    }
})


// this is for changing Kirtan paragraph 
router.post('/changekirtanpara/:id', function(req, res, next){
    var id = req.params.id
    var kirtanPara = req.body.kirtanPara

    req.checkBody('kirtanPara', 'please enter the kirtan paragraph')

    var errors = req.validationErrors()

    if(errors){
        res.status(500).json({status:false, response:errors, devMessage : 'validation has not been completed of form'})
    }else{
        Kirtan.findByIdAndUpdate(id, {kirtanPara : kirtanPara}, function(err, changedDone){
            if(err){
                res.status(500).json({status:false, response:'there is some while update the kirtan Name'})
            }else{
                res.status(200).json({status: true, response:'kirtan name has been updated sucessfully'})
            }
    })
    }
})


//------------------------->DELETING THE KIRTANS DETAILS ---------------------------------------------->

// this is for the delete option from the database no need to save this 
router.post('/deletekirtan/:id', function(req, res, next){
    var id = req.params.id

    Kirtan.findByIdAndDelete(id, function(err, chengedDone){
        if(err){
            res.status(500).json({status: false, response: 'there is some issue to delete the id\'s'})
        }else{
            res.status(200).json({status: true, response: 'the kirtan has been deleted sucessfulll' })
        }
    })
})


module.exports = router;
