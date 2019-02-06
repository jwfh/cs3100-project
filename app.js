const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Configure Express
// app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static React frontend
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// API routes to backend logic
const apiRouter = require('./backend/api');
app.use('/api', apiRouter);

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
  res.type('text');
  res.send(err.status + ' ' + res.locals.message);
});

module.exports = app;
