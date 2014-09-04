
module.exports = function(gulp, options) {
    var distDir = options.DIST_DIR + '/fonts/';

    return gulp.task('fonts', function() {
        return gulp.src('bower_components/bootstrap/fonts/**/*')
            .pipe(gulp.dest(distDir));
    });
};



