var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require("mysql");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/sql', function(req, res, next){
  // First you need to create a connection to the db
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "store"
  });

  con.connect(function(err){
    if(err){
      console.log(err);
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
    res.send({ title: 'sql' });
  });

  con.query('SELECT * FROM books',function(err,rows){
    if(err)
      console.log(err);
    console.log('Data received from Db:\n');
    console.log(rows);
  });
/*
  var book = { title: 'Españosl', author: 'sep' };
  con.query('INSERT INTO books SET ?', book, function(err,res){
    if(err)
    console.log(err);
    console.log('Last insert ID:', res.insertId);
  });
*/
  con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
  });

});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
