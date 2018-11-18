/*!
 * gulp
 * $ npm install gulp gulp-clean-css gulp-sass gulp-rename gulp-uglify --save-dev
 * Install app dependencies using the package.json
 * $ npm install --production
 * $ npm install --only=dev
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
var concat = require('gulp-concat');
var svgmin = require('gulp-svgmin');

/*
 * Settings
 */
var paths = {
    'project': './',
    'css': './css/',
    'sass': './sass/',
    'js': './js/',
    'svg': './src/svg/',
    'dist': './dist/',
};

var patterns = {
    'css': [paths.css+'*.css', paths.css+'**/*.css', '!'+paths.css+'*.min.css', '!'+paths.css+'**/*.min.css'],
    'sass': [paths.sass+'style.scss'],
    'js': [paths.js+'*.js', paths.js+'**/*.js', '!'+paths.js+'*.min.js', '!'+paths.js+'**/*.min.js', '!'+paths.js+'customizer.js', '!'+paths.js+'navigation.js', '!'+paths.js+'skip-link-focus-fix.js'],
    'svg': [paths.svg+'*.svg', paths.svg+'**/*.svg'],
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
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest(paths.project))
        .pipe(rename({suffix: '.min'}))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(paths.dist+paths.css));
});

/*
 * Scripts
 */
gulp.task('compress', function() {
    return gulp.src(patterns.js)
        .pipe(concat('base.min.js'))
        .pipe(gulp.dest(paths.dist+paths.js))
        .pipe(uglify({compress: { unused: false } }))
        .pipe(gulp.dest(paths.dist+paths.js));
});

/*
 * Sprites
 */
gulp.task('sprite:optimise', function() {
    return gulp.src(patterns.svg)
        .pipe(svgmin())
        .pipe(gulp.dest(paths.dist+'svg/'));
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