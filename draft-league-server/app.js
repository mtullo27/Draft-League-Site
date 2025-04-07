var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var coachRouter = require('./routes/coach');
var leagueRouter = require('./routes/league');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/coach', coachRouter);
app.use('/league', leagueRouter);

module.exports = app;
