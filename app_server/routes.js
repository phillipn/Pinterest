var express = require('express');
var router = express.Router();
var passport = require('passport');
var dashController = require('./controllers/dashController.js');

router.get('/', dashController.getDashboard);

router.get('/auth/twitter', passport.authenticate('twitter'));

// handle the callback after twitter has authenticated the user
router.get('/auth/twitter/callback',
	passport.authenticate('twitter', {
		successRedirect : '/',
		failureRedirect : '/auth/twitter'
	}));

module.exports = router;
