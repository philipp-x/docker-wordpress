/*!
 * gulp
 * $ npm install gulp gulp-clean-css gulp-sass gulp-rename gulp-uglify --save-dev
 * Install app dependencies using the package.json
 * $ npm install --production
 * npm will not install modules listed in devDependencies
 */

/*
 * Load plugins
 */
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

/*
 * Settings
 */
var paths = {
    'css': './css/',
    'sass': './sass/',
    'js': './js/',
    'dist': './dist/',
};

var patterns = {
    'css': ['style.css', paths.css+'*.css', paths.css+'**/*.css', '!'+paths.css+'*.min.css', '!'+paths.css+'**/*.min.css'],
    'sass': [paths.sass+'*.scss', paths.sass+'**/*.scss'],
    'js': [paths.js+'*.js', paths.js+'**/*.js', '!'+paths.js+'*.min.js', '!'+paths.js+'**/*.min.js'],
};

/*
 * Styles
 */
gulp.task('minify-css', function() {
    return gulp.src(patterns.css)
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dist+paths.css));
});

/*
 * Sass
 */
gulp.task('sass', function () {
    return gulp.src(patterns.sass)
        .pipe(rename({suffix: '.min'}))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(paths.dist+paths.css));
});

/*
 * Scripts
 */
gulp.task('compress', function() {
    return gulp.src(patterns.js)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist+paths.js));
});

/*
 * Default task
 */
gulp.task('default', function() {
    gulp.start('minify-css', 'sass', 'compress', 'watch');
});

/*
 * Watch
 */
gulp.task('watch', function() {
    gulp.watch(patterns.css, ['minify-css']);
    gulp.watch(patterns.sass, ['sass']);
    gulp.watch(patterns.js, ['compress']);
});