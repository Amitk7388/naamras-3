const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongodb = require('mongodb');
const mongoose = require('mongoose')
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const dotEnv = require('dotenv').config()
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const facebookStrategy = require('passport-facebook').Strategy




db = mongoose.connection

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/manager');
var endUserRouter = require('./routes/endusers');
var eventsRouter = require('./routes/events');
var kirtansRouter = require('./routes/kirtans');
var transportsRouter = require('./routes/transports');

const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/manager', usersRouter);
app.use('/user', endUserRouter);
app.use('/events', eventsRouter);
app.use('/kirtans', kirtansRouter);
app.use('/transports', transportsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

var port = 9999
// error handlers
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}).listen(port, console.log('Okay its working fine on port '+port ));

module.exports = app;
