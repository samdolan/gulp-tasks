var gutil = require('gulp-util');

module.exports = function(gulp, options) {
    var watching = false;
    gulp.task('watch', function() {
        if (!watching) {
            gulp.watch('./js/**', ['browserify'].concat(options.EXTRA_WATCH_TASKS));
            //gulp.watch('./img/**', ['images']);
            gulp.watch('./less/**', ['styles'].concat(options.EXTRA_WATCH_TASKS));
            gulp.watch('./index.html', ['html'].concat(options.EXTRA_WATCH_TASKS));
        }
    });
};
