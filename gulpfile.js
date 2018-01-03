'use strict';

//ISSUES TO FIX
  //i dont know how souremaps works
  //minify for my js isn't working
  //also, dont even ask how clueless i am with js hint bc i deleted it
  //but really what am i doing

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sourcemaps = require('gulp-sourcemaps');
//CSS helpers
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
//JS helpers
const minify = require('gulp-minify');



//This task compiles the Sass files --WORKS!
gulp.task('sass', function () {
  return gulp.src('src/styles/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/styles/css'));
    // .pipe(browserSync.stream());
});

//Watch and Serve --WORKS!
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: './'
  });
  gulp.watch(['src/styles/scss/*.scss'], ['sass']);
  gulp.watch(['*.html']).on('change', browserSync.reload)
})

//autoprefixer gulp task --WORKS!
gulp.task('autoprefixer', function(){
  return gulp.src('src/styles/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/styles/css/prefixed'));
});

//clean css to minify CSS files --WORKS!
gulp.task('minify-css', () => {
  return gulp.src('src/styles/css/prefixed/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});


//gulp-source map and minify
gulp.task('javascript', function(){
  gulp.src('src/scripts/*.js')
    .pipe(minify({
      ext: {
        src: '.js',
        min: '.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['-min.js']
    }))
  .pipe(gulp.dest('dist'));
})

//Default task- runs an array of tasks in the order you want
gulp.task('default', ['serve', 'autoprefixer', 'minify-css','javascript']);
