var clean = require('gulp-clean');
var changed = require('gulp-changed');

module.exports = function(gulp, options) {
    gulp.task('clean', function() {
        return gulp.src([options.DIST_DIR + '/*'], {read: false})
              .pipe(clean({force: true}));
    });
};
