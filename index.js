module.exports = function(gulp, options) {
    require('gulp-help')(gulp, { aliases: ['h', '?']});
    require('./gulp')(gulp, options);
};
