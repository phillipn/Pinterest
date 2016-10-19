module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-mocha-test')

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                eqeqeq: true,
                immed: true,
                latedef: 'nofunc',
                newcap: true,
                quotmark: 'single',
                trailing: true,
                unused: true,
                asi: true,
                boss: true,
                expr: true,
                laxbreak: true,
                laxcomma: true,
                scripturl: true,
                sub: true,
                loopfunc: true
            },
            all: [
                './Gruntfile.js',
                './lib/**/*.js',
                './test/**/*.js'
            ]
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'should'
            },
            all: {
                src: ['./test/index.js']
            }
        }
    })

    grunt.registerTask('test', [
        'jshint',
        'mochaTest'
    ])

}
