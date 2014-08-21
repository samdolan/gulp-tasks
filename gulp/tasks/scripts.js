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

// Initial from https://github.com/chmontgomery/load-common-gulp-tasks/blob/master/felint/.jshintrc
var jshintOpts = {
    "maxerr"        : 100,       // {int} Maximum error before stopping

    // Enforcing
    "bitwise"       : true,     // true: Prohibit bitwise operators (&, |, ^, etc.)
    "camelcase"     : false,    // true: Identifiers must be in camelCase
    "curly"         : true,     // true: Require {} for every new block or scope
    "eqeqeq"        : true,     // true: Require triple equals (===) for comparison
    "forin"         : true,     // true: Require filtering for..in loops with obj.hasOwnProperty()
    "immed"         : false,    // true: Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
    "indent"        : 2,        // {int} Number of spaces to use for indentation
    "latedef"       : false,    // true: Require variables/functions to be defined before being used
    "newcap"        : false,    // true: Require capitalization of all constructor functions e.g. `new F()`
    "noarg"         : true,     // true: Prohibit use of `arguments.caller` and `arguments.callee`
    "noempty"       : true,     // true: Prohibit use of empty blocks
    "nonew"         : false,    // true: Prohibit use of constructors for side-effects (without assignment)
    "plusplus"      : false,    // true: Prohibit use of `++` & `--`
    "quotmark"      : false,    // Quotation mark consistency:
    //   false    : do nothing (default)
    //   true     : ensure whatever is used is consistent
    //   "single" : require single quotes
    //   "double" : require double quotes
    "undef"         : true,     // true: Require all non-global variables to be declared (prevents global leaks)
    "unused"        : false,     // true: Require all defined variables be used
    "strict"        : false,     // true: Requires all functions run in ES5 Strict Mode
    "maxparams"     : false,    // {int} Max number of formal params allowed per function
    "maxdepth"      : false,    // {int} Max depth of nested blocks (within functions)
    "maxstatements" : false,    // {int} Max number statements per function
    "maxcomplexity" : false,    // {int} Max cyclomatic complexity per function
    "maxlen"        : false,    // {int} Max number of characters per line

    // Relaxing
    "asi"           : false,     // true: Tolerate Automatic Semicolon Insertion (no semicolons)
    "boss"          : false,     // true: Tolerate assignments where comparisons would be expected
    "debug"         : false,     // true: Allow debugger statements e.g. browser breakpoints.
    "eqnull"        : false,     // true: Tolerate use of `== null`
    "es5"           : false,     // true: Allow ES5 syntax (ex: getters and setters)
    "esnext"        : false,     // true: Allow ES.next (ES6) syntax (ex: `const`)
    "moz"           : false,     // true: Allow Mozilla specific syntax (extends and overrides esnext features)
    // (ex: `for each`, multiple try/catch, function expression…)
    "evil"          : true,      // true: Tolerate use of `eval` and `new Function()`
    "expr"          : true,      // true: Tolerate `ExpressionStatement` as Programs
    "funcscope"     : false,     // true: Tolerate defining variables inside control statements"
    "globalstrict"  : false,     // true: Allow global "use strict" (also enables 'strict')
    "iterator"      : false,     // true: Tolerate using the `__iterator__` property
    "lastsemic"     : false,     // true: Tolerate omitting a semicolon for the last statement of a 1-line block
    "laxbreak"      : false,     // true: Tolerate possibly unsafe line breakings
    "laxcomma"      : false,     // true: Tolerate comma-first style coding
    "loopfunc"      : false,     // true: Tolerate functions being defined in loops
    "multistr"      : false,     // true: Tolerate multi-line strings
    "proto"         : false,     // true: Tolerate using the `__proto__` property
    "scripturl"     : false,     // true: Tolerate script-targeted URLs
    "shadow"        : false,     // true: Allows re-define variables later in code e.g. `var x=1; x=2;`
    "sub"           : false,     // true: Tolerate using `[]` notation when it can still be expressed in dot notation
    "supernew"      : false,     // true: Tolerate `new function () { ... };` and `new Object;`
    "validthis"     : false,     // true: Tolerate using this in a non-constructor function

    // Environments
    "browser"       : true,     // Web Browser (window, document, etc)
    "couch"         : false,    // CouchDB
    "devel"         : true,     // Development/debugging (alert, confirm, etc)
    "dojo"          : false,    // Dojo Toolkit
    "jquery"        : true,    // jQuery
    "mootools"      : false,    // MooTools
    "node"          : true,    // Node.js
    "nonstandard"   : false,    // Widely adopted globals (escape, unescape, etc)
    "prototypejs"   : false,    // Prototype and Scriptaculous
    "rhino"         : false,    // Rhino
    "worker"        : false,    // Web Workers
    "wsh"           : false,    // Windows Scripting Host
    "yui"           : false,    // Yahoo User Interface

    // Custom Globals
    "globals": {
        "chrome": true
    }
};

module.exports = function(gulp, options) {
    var distDir = options.DIST_DIR + '/js/';

    gulp.task('javascript', function() {
        return gulp.src(['js/**/*.js', 'js/app.js'])
            .pipe(react())
            .on('error', handleErrors)
            .pipe(jshint(jshintOpts))
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter('fail'))
            .on('error', handleErrors)
            .pipe(gulp.dest(distDir));
    });

    function browserifyTask() {
        return gulp.src('dist/js/app.js')
            .pipe(browserify({
                transform: ['envify'],
                paths: ['./node_modules','./js']
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
