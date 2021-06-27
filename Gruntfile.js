'use strict';

module.exports=function(grunt){
     //Time how long tasks take.Can help with optimizing build times.
     require('time-grunt')(grunt);

     //Automatically load grunt tasks.
     require('jit-grunt')(grunt);

    
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
};