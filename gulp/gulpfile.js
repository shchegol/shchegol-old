var gulp = require('gulp'),
    concatCSS = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass');



// server
gulp.task('connect', function() {
    connect.server({
        root: '../',
        livereload: true
    });
});

// html
gulp.task('html', function() {
    gulp.src('../index.html')
        .pipe(connect.reload());
});

// css
gulp.task('css', function() {
    gulp.src('scss/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer('last 15 version'))
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('../css'))
        .pipe(connect.reload());
});

// js
gulp.task('js', function() {
    gulp.src('js/main.js')
        .pipe(gulp.dest('../js'))
        .pipe(connect.reload());
});

// watch
gulp.task('watch', function() {
    gulp.watch('scss/main.scss', ['css']);
    gulp.watch('js/main.js', ['js']);
    gulp.watch('../index.html', ['html']);
});

// default
gulp.task('default', ['connect', 'html', 'css', 'js', 'watch']);
