const express = require('express');
const router = express.Router();
// const multer = require('multer')

var User = require('../models/user')

/* GET users listing. */
router.get('/addvolunteer/api', function(req, res, next) {
  res.render('dataSend', {title : 'Express'})
});

router.post('/addvolunteer/api', function(req, res, next){
   
 console.log(req.body)
  // taking the variable from body form 
  var name = req.body.name;
  var email = req.body.email;
  var purpose = req.body.purpose;
  var mobile = req.body.mobile;
  
  
  // var passowrd = req.body.password;
  //we will not take the password , we mentioned the password to as his/her mobile number as you
  //see in the newUser object

  // check body from express validator 
  req.checkBody('name', 'please enter the name').notEmpty();
  req.checkBody('email', 'please enter the email id ').isEmail().notEmpty();
  req.checkBody('purpose', 'please select the purpose').notEmpty();
  req.checkBody('mobile', 'please enter the mobile number ').notEmpty();
  
  
  var errors = req.validationErrors();

  // if email id already exist then it will redirect to to main page 
  User.findOne({email : req.body.email}, function (err, useremail){
    if(err){
     res.status(500).json({ status: false, response: err, devMessage: "mongodb error on find user" });
    }
    else if(useremail){
       res.status(200).json({status : false, response : 'email id already existed. please thy again with new mail id', devMessage :"user is already in the database"})
    };
  });
  // req.checkBody('password', 'please enter the password').notEmpty()
  

  // this is for the errors validations
  

  console.log('this has been reached 1')
  var errors = req.validationErrors();

  if(errors){
    console.log('some errors')
    // res.render('/')
    res.status(500).json({status : false, response : errors, devMessagse : " there is some issue with req.validation errors" })
    console.log(errors);    
  }else{
    
    
    var newUser = new User({
      name : req.body.name,
      email :req.body.email,
      purpose : req.body.purpose,
      mobile : req.body.mobile
      
    })
    User.createUser(newUser, function(err, user){
      if(err){
        res.status(500).json({status : false, response : errors, devMessagse : 'there is some issue creating newUser' })
      }
      else{
        
        res.status(200).json({
          status :  true, 
          response :user, 
          devMessage : 'the newUser has been created sucessfully'})
      }

    });
    
  }
})


module.exports = router;
