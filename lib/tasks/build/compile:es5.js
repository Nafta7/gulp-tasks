'use strict';

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var _vinylSourceStream = require('vinyl-source-stream');

var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);

var _gulpTap = require('gulp-tap');

var _gulpTap2 = _interopRequireDefault(_gulpTap);

var _gulpBuffer = require('gulp-buffer');

var _gulpBuffer2 = _interopRequireDefault(_gulpBuffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (gulp, paths, $) {
  function compileJSES5(cb) {
    if (!paths.scripts) {
      $.gutil.log('[' + compileJSES5.displayName + '] Warning: ' + 'task did not complete because script paths are not defined.');
      cb();
      return;
    }

    var bsync = $.browserSync ? $.browserSync.stream : $.gutil.noop;
    var files = paths.scripts.glob || '*';
    files += '.js';
    var stream = gulp.src($.path.join(paths.scripts.src, files), {
      read: false,
      base: paths.scripts.src
    }).pipe((0, _gulpTap2.default)(function (file) {
      $.gutil.log('[' + compileJSES5.displayName + '] ' + ('Bundling script: ' + $.path.join(paths.scripts.src, file.relative)));
      file.contents = (0, _browserify2.default)(file.path, { debug: true }).bundle();
    })).pipe((0, _gulpBuffer2.default)()).pipe($.sourcemaps.init({ loadMaps: true })).pipe($.sourcemaps.write('./')).pipe(gulp.dest(paths.scripts.dest)).pipe(bsync());

    return stream;
  }

  compileJSES5.displayName = 'compile:ES5';
  return compileJSES5;
};

// Courtesy of gulpjs recipes
// http://gulpjs.org/recipes/browserify-multiple-destination.html