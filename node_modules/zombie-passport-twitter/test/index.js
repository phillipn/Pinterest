var server = require('./server')
var supertest = require('supertest')
var zpt = require('../lib/')

var CONFIG = require('./config.json')

describe('zombie-passport-twitter', function(){

    it('should sign in', function(done){
        this.timeout(30e3)
        supertest(server)
            .get('/')
            .expect(401)
            .end(function(err){
                if (err) throw err
                zpt.signIn({
                    url: 'http://127.0.0.1:3000/auth/twitter',
                    username: CONFIG.username,
                    password: CONFIG.password
                }, function(err, browser){
                    if (err) throw err
                    supertest(server)
                        .get('/')
                        .set('cookie', browser.cookies[0].toString())
                        .expect(200)
                        .end(done)
                })
            })
    })

})
