'use strict';
//This is for gulp 4
// const {src, watch, task, dest, series, parallel}  = require('gulp')

//Loaading the gulp module in gulp3

const { series } = require('gulp');
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

//This is for gulp 4
// function sass(done) {
//     return src('./css/*.scss')
//     .pipe(sass().on('error',sass.logError))
//     .pipe(dest('./css'));
// };


//This is for gulp 3


gulp.task('sass',function(){
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./css'));
});

//this is for gulp 4
// function sass_watch(done){
//     watch('./css/*.scss',['sass']);
//     done();
// };


//This is for gulp 3


gulp.task('sass:watch', function() {
    gulp.watch('./css/*.scss',['sass']);
});

//This is for gulp 4
// function browser_sync(done){
//     var files = [
//         './*.html',
//         './css/*.css',
//         './img/*.{png,jpg,gif}',
//         './js/*.js'
//      ];
  
//      browserSync.init(files, {
//         server: {
//            baseDir: "./"
//         }
//      });
//     done();
// }


//This is for gulp 3


gulp.task('browser-sync', function () {
    var files = [
       './*.html',
       './css/*.css',
       './img/*.{png,jpg,gif}',
       './js/*.js'
    ];
 
    browserSync.init(files, {
       server: {
          baseDir: "./"
       }
    });
 
 });

 // Default task
 //old task

 //This is for gulp 3

gulp.task('default',gulp.series( ['browser-sync'], function() {
    gulp.start('sass:watch');
}));


//New tasks
// exports.sass = sass;
// exports.sass_watch = sass_watch;
// exports.browser_sync = browser_sync;
// exports.default = series(browser_sync,sass_watch);
// Note that in old tasks we used commands and in the new tasks we used
// functions
// The syntax of exports is exports."any-command-name-you-like or default" = function or group of functions