// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'twitterAuth' : {
		'consumerKey' 		: 'IOjUsQaQjt9HIKbmFrHl7VVE5',
		'consumerSecret' 	: 'wGjYSbAtQijS2kg53mauMVMQJcBfAqQrgHLnwEVE3dwSEitVap',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	}
	// Must change callbackUrl in order to display on heroku

};
