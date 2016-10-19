var assert = require('assert')
var Zombie = require('zombie')

exports.signIn = signIn

function signIn(options, callback) {
    var wait
    var zombie
    try {
        assert(typeof options.url === 'string', '`url` option must be a String')
        assert(typeof options.username === 'string', '`username` option must be a String')
        assert(typeof options.password === 'string', '`password` option must be a String')
        wait = (typeof options.wait === 'number') ? options.wait : 0
        zombie = (options.zombie instanceof Zombie) ? options.zombie : new Zombie()
    } catch (ex) {
        return process.nextTick(function(){
            return callback(ex)
        })
    }
    zombie.visit(options.url, function(err){
        if (err) return callback(err)
        zombie
            .fill('#username_or_email', options.username)
            .fill('#password', options.password)
            .pressButton('#allow', function(err){
                if (err) return callback(err)
                zombie.clickLink('.maintain-context', function(err){
                    if (err) return callback(err)
                    zombie.wait(wait, function(err){
                        if (err) return callback(err)
                        return callback(null, zombie)
                    })
                })
            })
    })
}
