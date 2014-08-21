var sourcemaps = require('gulp-sourcemaps');
var recess = require('gulp-recess');
var less = require('gulp-less');
var handleErrors = require('../util/handleErrors');

module.exports = function(gulp, options) {
    gulp.task('styles', function() {
        return gulp.src('./less/**/*')
        .pipe(sourcemaps.init())
        .pipe(less())
        .on('error', handleErrors)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(options.DIST_DIR));
    });
};
