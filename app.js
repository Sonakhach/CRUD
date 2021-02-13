const mongoose = require ('mongoose');
var express =require('express');
var path = require('path');
var createError = require('http-errors');

var bodyParser =require('body-parser');
var cookieParser = require('cookie-parser');
var app=express(); 

var urlencodedparser=bodyParser.urlencoded({extended:false});

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


const dblink = require('./config/index.js');

mongoose.connect(dblink.link,{useNewUrlParser: true , useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', ()=>{
	console.log('Connected') 
});


var logger = require('morgan');

const indexRoutes = require('./routes/indexRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');


app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/auth',urlencodedparser, authRoutes);



app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
