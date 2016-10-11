require('dotenv').config();
var express  = require('express');
var app      = express();
var passport = require('passport');
var port     = process.env.PORT || 8080;
var secret = process.env.SECRET;
var flash    = require('connect-flash');
var mongoose = require('mongoose');
app.set( 'port', ( port || 5000 ));

// configuration ===============================================================
mongoose.connect(process.env.MONGOLAB_URI); // connect to our database

require('./config/passport.js')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	app.use(express.session({ secret: secret })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
});

// routes ======================================================================
require('./app_server/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
