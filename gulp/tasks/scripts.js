var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var handleErrors = require('../util/handleErrors');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function(gulp, options) {
    var distDir = options.DIST_DIR + '/js/';

    gulp.task('javascript', function() {
        return gulp.src(['js/**/*.js', 'js/app.js'])
            .pipe(react())
            .on('error', handleErrors)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter('fail'))
            .on('error', handleErrors)
            .pipe(gulp.dest(distDir));
    });

    function browserifyTask() {
        return gulp.src('dist/js/app.js')
            .pipe(browserify({
                transform: ['envify'],
                paths: ['./node_modules','./js/']
            }))
            .pipe(rename(options.JS_BUNDLE_NAME))
            .pipe(gulp.dest('dist/js/'))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('dist/js/'));
    }

    gulp.task('browserify', ['javascript'], browserifyTask);
    gulp.task('browserify_nodep', browserifyTask);
};
