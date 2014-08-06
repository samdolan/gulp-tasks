var changed = require('gulp-changed');

module.exports = function(gulp, options) {
    gulp.task('html', function() {
        return gulp.src('./index.html')
        .pipe(gulp.dest(options.DIST_DIR));
    });
};
