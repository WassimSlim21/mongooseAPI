var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/database');
var passport = require('passport');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var packsRouter = require('./routes/pack');
const http = require('http').Server(app);

console.log('in app.js')

var app = express();


/*--------------------*/

/* CORS Setup*/
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

//Mongoose Connect

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: mongoose.Promise })
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));

//initialisation du module passport 
app.use(passport.initialize());
require('./config/passport')(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.get('/', function (req, res, next) {
  res.send(true).status(200);
});






/* Global routers */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/packs', packsRouter);


/*--------------------*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
