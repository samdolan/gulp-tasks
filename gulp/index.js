var fs = require('fs');
var path = require('path');
var _ = require('lodash/dist/lodash.underscore');

var justJs = function(name) {
    return path.extname(name) === '.js';
};

var tasks = fs.readdirSync(__dirname + '/tasks/').filter(justJs);

module.exports = function(gulp, option_overrides) {
    var defaults = {
        "DIST_DIR": "./dist",
        "JS_BUNDLE_NAME": "bundle.js",
        "EXTRA_WATCH_TASKS": []
    };
    var options = {}
    _.extend(options, defaults, option_overrides);
    console.log(options);

    tasks.forEach(function(task) {
        require('./tasks/' + task)(gulp, options);
    });
};
