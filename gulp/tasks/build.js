module.exports = function(gulp, options) {
    gulp.task('build', ['html', 'browserify', 'styles']);
};
