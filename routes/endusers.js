const express = require('express');
const router = express.Router();
const localStrategy = require('passport-local').Strategy;
const passport = require('passport'); 
const facebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

let EndUser = require('..//models/enduser');
let Manager = require('..//models/manager')

router.get('/signup/api', function(req, res, next){
    res.render('enduser', {
        title : 'Sign UP'
    });
});




//<--------------<------------------Login Authentication ---------------->------------------------>



passport.serializeUser(function(user, done){
    done(null, user.id)
})


passport.deserializeUser(function(er, user){
    EndUser.getUserByID(id, function(err, user){
        done(err, user);
    })
})


// aplying local strategy for the to find the user name and password
passport.use(new localStrategy(function(email, password, done, ){

    EndUser.findUserByEmail(email, function(err, user){
        if(err){
            return done(err)
        }
        if(!user){
            console.log('unknown user');
            return done(null, false, {message : 'incorrect email id'})
        }
        EndUser.ComparePassword(password, user.password, function(err, isMatch){
            if(err){
                console.log('there is some connection issue')
                return done(err)
            }
            if(isMatch){
                console.log('password is matched')
                return done(null, user);
            }else{
                console.log('invalid password')
                return done(null, false , {message : 'incorrect password has been sent from user'})
            }
        })
    })
}))


// CREATING MANAGERS API ROUTING AFTER LOGIN AUTHENTIATION

router.post('/login/api', function(req, res, next){
    FIXME:
    // there will be two form name -> email id && -> password
    var email= req.body.email;
    var password = req.body.password;

    //form validation with express validator

    req.checkBody('name', 'please enter the name ').notEmpty();
    req.checkBody('email', 'please enter the email id ').notEmpty().isEmail();

    Manager.findOne({email: email}, function(err, user){
        if(err){
            return status(500).json({status: false, response : err, DevMessage: "there is some issue to onnecting the database"});
        }

        if(!user){
            // else this will authenticate with enduser password
                        passport.authenticate('local', {successRedirect : '/manager/addvolunteer/api',
                        failureRedirect : '/user/signup/api',
                        failureMessage : 'please try again there is some connection issue'
                                                        }, 
                        console.log('authenticated sucessfull')
                    )
        }

        if(password === user.password){
            // if password will match this will redirect to manager dashboard
            res.redirect('/managerdasboard/api')
        }else{
        res.status(400).json({status: false, response:'password does not match' })
        }
    })
})


//<--------------------------------------Facebook login authentication-------------------------------->

// this for the facebook login passport authntication  where this url wil redirect to the facebook url or page
router.post('/auth/facebook', passport.authenticate('facebook'),function(req, res){
    passport.use(new facebookStrategy({
        clientID :process.env.FB_CLIENT_ID,
        clientSecret : process.env.FB_SECRET_ID,
        callbackURL : "http://localhost:9999/auth/facebook/callback"
    }, 
        function(accessToken, refreshToken, profile, done){
           process.nextTick(function(){    // process.nextTick() => this is for the event loop management while using this this works as async 
               EndUser.findOne({'facebook.id' : profile.id}, function(err, user){
                   if(err){
                       console.log('facebook Id is something is');
                       return done(err);
                  }if(user){
                      console.log('something is working using find one fron facebook authentication')
                      return done(user)
                  }else{
                      var newEndUSer = new EndUser({
                        facebook : {
                        id: profile.body.id,
                        token : accessToken,
                        name : profile.name.givenName + ' '+ profile.name.familyName,
                        email :  prfile.email[0].value,
                        }
                      })
                      EndUser.createFacebookUser(newEndUser, function(err, newEndUser){
                        if(err){
                            return status(500).json({status: false, response : err, DevMessage: " there is some issue creating newEndUser"});
                        }else{
                            return status(200).json({status : true, response : newEndUser, devMessage : "finally newEndUser has been created"});
                        }
                    }).then(newUserFacebook => res.json(newUserFacebook));
    
                    }
                  
               })
           })
        }))
    
}, function(err, done, ){
            if(err){
                console.log('there is some connectio issue while routing for the facebook')
                console.log(err)
            }
})


// using this Facebook Stratagey i have taken from the this link https://www.youtube.com/watch?v=OMcWgmkMpEE&t=10s
//making facebook Strategy for the facebook login authentication


// After approval the User authentication from user 
// this URL wil route the the page of where 
// there will be will be two routes and when it authenticated this ur url will send to anothere url either Home or login page 

router.post('auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect : '/home',
                                        failureRedirect : '/user/login/api'
    }, function(err, authenticated){
        if(err){
            console.log(err)
            console.log('there is some connection issue where face cannot authenticate')
        }else{
            console.log('authenticated sucessfully')
        }
    }))



//<------------------------------SignUp User------------------------------------------------------>


router.post('/signup/api', function(req, res, next){
    
    console.log('siignup post has been called ');

    // console.log(req.body);
    // creating variable of the user form
    var name = req.body.name;
    var email = req.body.email;
    var mobile = req.body.mobile
    var password = req.body.password;
    var repassword = req.body.repassword;


    //validating of the user form

    req.checkBody('name', 'please fill the name').notEmpty();
    req.checkBody('email', 'please enter the correct email').isEmail().notEmpty();
    req.checkBody('mobile', 'please enter the number ').isNumeric().notEmpty();
    req.checkBody('password', 'please enter the password').equals(repassword).notEmpty();
    

    //this finding the errors 
    var errors = req.validationErrors();

    // finding if the user email is already is existed
    EndUser.findOne({email: email}, function(err, emailExist){
        if(err){
            res.status(500).json({status : false, response : err, devMessage : 'there is some issue finding user email existence'})
        }
        else if(emailExist){
            res.status(500).json({status: true, response : 'Email Id is already Existed, Please enter the new Email id',
        devMessage :"email is already exsited message error"
                                })
        }

    })
    
    // creating the object from req.body if err ---------> resut else object will create validation
    if(errors){
        res.status(500).json({status: false, response : errors, DevMessage : "there is some err is validating the data from users"}) ;
    }else{
        var newEndUser = new EndUser({
            name : name,
            email: email,
            mobile : mobile,
            password : password
        });
        
        // creating the object in user
        EndUser.createEndUser(newEndUser, function(err, newEndUser){
            if(err){
                res.status(500).json({status: false, response : err, DevMessage: " there is some issue creating newEndUser"});
            }else{
                res.status(200).json({status : true, response : newEndUser, devMessage : "finally newEndUser has been created"});
            }
        });
    };

});




//<---------------------------Google Authentication----------------------------------------------->

router.post('/auth/google',
  passport.authenticate('google', { scope: ['profile, email']}, function(req, res){
   
    passport.use( new GoogleStrategy({
        clientID :process.env.GL_CLIENT_ID,
        clientSecret : process.env.GL_SECRET_ID,
        callbackURL : "http://localhost:9999/auth/google/callback"
            }, function(accessToken, refreshToken, profile, done){
                User.findOne({'google.id': profile.id}, function(err, user){
                    if(err){
                        console.log('something is not working')
                        done(err)
                    }
                    if(user){
                        console.log('google has found the details of the user');
                        done(user)
                    }else{
                        var newEndUser = new EndUser({
                            google : {
                                id: profile.body.id,
                                token : accessToken,
                                name : profile.displayName,
                                email :  prfile.email[0].value,
                            }
                        })
                        EndUser.createGoogleUser(newEndUser, function(err, newEndUser){
                            if(err){
                                console.log(err)
                                return status(500).json({status:false, response: err, devMessage: 'there is some connection while creatingthe google authentication newUser'})
                            }else{
                                return status(200).json({status:true, response: newEndUser})
                            }
                        }).then(newUserGoogle => res.json(newUserGoogle));
                    }
            })
    }))
    
    
  }, function(err, done){
      if(err){
          console.log(err)
          done(err)
          console.log('there is some issue while routing this page')
      }
  } 
))

router.post('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login/api' }),
  function(req, res) {
    res.redirect('/');
  });






module.exports = router;