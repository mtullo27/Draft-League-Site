var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adminRouter = require('./routes/admin/admin');
var aliasRouter = require('./routes/coach/alias');
var audit_logRouter = require('./routes/audit/audit_log');
var coachRouter = require('./routes/coach/coach');
var command_queueRouter = require('./routes/admin/command_queue');
var commandRouter = require('./routes/admin/command');
var competitiveRouter = require('./routes/competitive/competitive');
var divisionRouter = require('./routes/league/division');
var draftRouter = require('./routes/league/draft');
var eventRouter = require('./routes/audit/event');
var game_typeRouter = require('./routes/league/game_type');
var infoRouter = require('./routes/league/info');
var kill_leadersRouter = require('./routes/kill_leaders');
var leagueRouter = require('./routes/league/league');
var player_statsRouter = require('./routes/player_stats');
var pokedexRouter = require('./routes/pokedex');
var rosterRouter = require('./routes/league/roster');
var tierRouter = require('./routes/league/tier');

var app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//League Routes
app.use('/league', leagueRouter);
app.use('/league/roster', rosterRouter);
app.use('/league/tier', tierRouter);
app.use('/league/division', divisionRouter);
app.use('/league/draft', draftRouter);
app.use('/league/info', infoRouter);
app.use('/league/schedule/game_type', game_typeRouter);

//Admin Routes
app.use('/admin', adminRouter);
app.use('/admin/audit_log', audit_logRouter);
app.use('/aduit/audit_log/event', eventRouter);
app.use('/admin/command', commandRouter);
app.use('/admin/command_queue', command_queueRouter);

//Coach Routes
app.use('/coach', coachRouter);
app.use('/coach/alias', aliasRouter);

//Misc Routes
app.use('/kill_leaders', kill_leadersRouter);
app.use('/player_stats', player_statsRouter);
app.use('/pokedex', pokedexRouter);
app.use('/competitive', competitiveRouter);

module.exports = app;
