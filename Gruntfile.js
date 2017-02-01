module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
                stripBanners: true
            },
            dist: {
                // the files to concatenate
                src: ['src/js/*'],
                // the location of the resulting JS file
                dest: 'assets/js/<%= pkg.name %>.js'
            }
        },
        less: {
            always: {
                options: {
                    paths: ['assets/css'],
                },
                files: {
                    'assets/css/main.css': 'src/less/main.less'

                }
            }
        },
        uglify: {
            js: {
                options: {
                    preserveComments: false
                },
                files: {
                    'assets/js/script.min.js': ['assets/js/<%= pkg.name %>.js']
                }
            }
        },
        watch: {
            concat: {
                files: ['src/js/*'],
                tasks: 'concat'
            },
            less: {
                files: 'src/less/*',
                tasks: 'less:always',
                options: {
                    livereload: true
                }
            },
            uglify: {
                files: 'assets/js/<%= pkg.name %>.js',
                tasks: 'uglify:js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);


};
