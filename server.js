// require('dotenv').config(); //
var express  = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port     = process.env.PORT || 8080;
var session = require('express-session');
var flash    = require('connect-flash');
require('./app_api/models/db');
require('./config/passport')(passport); // pass passport for configuration
var routes = require('./app_server/routes.js');
var apiRoutes = require('./app_api/routes/index.js');

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/api', apiRoutes);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app;
