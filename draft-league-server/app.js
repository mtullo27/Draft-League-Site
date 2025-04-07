var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adminRouter = require('./routes/admin');
var aliasRouter = require('./routes/alias');
var audit_logRouter = require('./routes/audit_log');
var coachRouter = require('./routes/coach');
var command_queueRouter = require('./routes/command_queue');
var commandRouter = require('./routes/command');
var divisionRouter = require('./routes/division');
var draftRouter = require('./routes/draft');
var eventRouter = require('./routes/event');
var game_typeRouter = require('./routes/game_type');
var infoRouter = require('./routes/info');
var kill_leadersRouter = require('./routes/kill_leaders');
var leagueRouter = require('./routes/league');
var player_statsRouter = require('./routes/player_stats');
var rosterRouter = require('./routes/roster');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/coach/alias', aliasRouter);
app.use('/admin/audit_log', audit_logRouter);
app.use('/admin/command', commandRouter);
app.use('/admin/command_queue', command_queueRouter);
app.use('/coach', coachRouter);
app.use('/league/division', divisionRouter);
app.use('/league/draft', draftRouter);
app.use('/audit/event', eventRouter);
app.use('league/schedule/game_type', game_typeRouter);
app.use('/', infoRouter);
app.use('/kill_leaders', kill_leadersRouter);
app.use('/league', leagueRouter);
app.use('/player_stats', player_statsRouter);
app.use('/league/roster', rosterRouter);

module.exports = app;
