var express = require('express')
var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy

var CONFIG = require('./config.json')
var USER = { id: 1 }
var server = module.exports = express()

passport.use(new TwitterStrategy({
    consumerKey: CONFIG.consumerKey,
    consumerSecret: CONFIG.consumerSecret,
    callbackURL: '/auth/twitter/callback'
}, function(token, secret, profile, callback){
    return callback(null, USER)
}))
passport.serializeUser(function(user, callback){
    return callback(null, user.id)
})
passport.deserializeUser(function(id, callback){
    return callback(null, USER)
})

server
    .set('env', 'test')
    .set('port', 3000)
    .set('strict routing', true)
    .set('case sensitive routing', true)
    .use(express.cookieParser())
    .use(express.session({ secret: 'zpt'} ))
    .use(passport.initialize())
    .use(passport.session())
    .get('/auth/twitter', passport.authenticate('twitter'))
    .get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/' }))
    .get('/', function(req, res){
        if (!req.isAuthenticated()) return res.send(401)
        return res.send(200)
    })

server.listen(server.get('port'))
