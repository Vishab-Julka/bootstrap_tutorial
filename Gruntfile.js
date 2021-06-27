'use strict';

module.exports=function(grunt){
     //Time how long tasks take.Can help with optimizing build times.
     require('time-grunt')(grunt);

     //Automatically load grunt tasks.
     require('jit-grunt')(grunt, { 
         useminPrepare: 'grunt-usemin'
     });

    
     const sass = require("node-sass");
      //Define the configuration for all the tasks.
    grunt.initConfig({
       sass: {
           options: {
               implementation: sass,
               sourceMap: true
           },
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
       },

       copy: {
           html: {
               files: [
                   {
                   //for html
                   expand:true,
                   dot:true,
                   cwd: './',
                   src: ['*.html'],
                   dest: 'dist_grunt'
                   }]
           },
           fonts: {
               files: [
                   {
                       //for font-awesome
                       expand: true,
                       dot: true,
                       cwd: 'node_modules/font-awesome',
                       src: ['fonts/*.*'],
                       dest: 'dist_grunt'
                   }]
           }
       },
       
       clean: {
           build: {
               src: [ 'dist_grunt/']
           }
       },
       
       imagemin: {
           dynamic: {
               files: [{
                   expand:true, //Enable dynamic expansion
                   cwd:'./',    //Src matches are relative to this path
                   src: ['img/*.{png,jpg,gif}'], //Actual patterns to match
                   dest: 'dist_grunt/'           //Destination path prefix
               }]
           }
       },

       useminPrepare: {
        foo: {
            dest: 'dist_grunt',
            src: ['contactus.html','aboutus.html','index.html']
        },
        options: {
            flow: {
                steps: {
                    css: ['cssmin'],
                    js:['uglify']
                },
                post: {
                    css: [{
                        name: 'cssmin',
                        createConfig: function (context, block) {
                        var generated = context.options.generated;
                            generated.options = {
                                keepSpecialComments: 0, rebase: false
                            };
                        }       
                    }]
                }
            }
        }
    },

     // Concat
     concat: {
        options: {
            separator: ';'
        },

        // dist configuration is provided by useminPrepare
        dist_grunt: {}
    },

    // Uglify
    uglify: {
        // dist configuration is provided by useminPrepare
        
        dist_grunt: {}
    },

    cssmin: {
        
        dist_grunt: {}
    },

    // Filerev
    filerev: {
        options: {
            encoding: 'utf8',
            algorithm: 'md5',
            length: 20
        },

        release: {
        // filerev:release hashes(md5) all assets (images, js and css )
        // in dist directory
            files: [{
                src: [
                    'dist_grunt/js/*.js',
                    'dist_grunt/css/*.css',
                ]
            }]
        }
    },

    // Usemin
        // Replaces all assets with their revved version in html and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths
        usemin: {
            html: ['dist_grunt/contactus.html','dist_grunt/aboutus.html','dist_grunt/index.html'],
            options: {
                assetsDirs: ['dist_grunt', 'dist_grunt/css','dist_grunt/js']
            }
        },

        htmlmin: {                                         // Task
            dist: {                                        // Target
                options: {                                 // Target options
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'dist_grunt/index.html': 'dist_grunt/index.html',  // 'destination': 'source'
                    'dist_grunt/contactus.html': 'dist_grunt/contactus.html',
                    'dist_grunt/aboutus.html': 'dist_grunt/aboutus.html',
                }
            }
        },

       watch: {
           files: 'css/*.scss',
           tasks: ['sass']
       },
       browserSync: {
           dev: {
               bsFiles: {
                   src: [
                       'css/*.css',
                       'js/*.js',
                       '*.html'
                   ]
               },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
       }
    });

    grunt.registerTask('css',['saas']);
    grunt.registerTask('default',['browserSync','watch']);
    grunt.registerTask('build',[
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};