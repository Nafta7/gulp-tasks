'use strict';

var _gulpBabelMinify = require('gulp-babel-minify');

var _gulpBabelMinify2 = _interopRequireDefault(_gulpBabelMinify);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (gulp, paths, $) {
  function minifyJs(cb) {
    if (!paths.scripts) {
      $.gutil.log('[' + minifyJs.displayName + '] Warning: ' + 'task did not complete because script paths are not defined.');
      cb();
      return;
    }

    $.gutil.log('[' + minifyJs.displayName + '] ' + ('Minifying js from: ' + paths.scripts.dest));
    var dest = paths.scripts.dest;
    var match = paths.scripts.glob || '**/*';
    match += '.js';
    match = $.path.join(dest, match);
    var pathJSMap = $.path.join(dest, '*.js.map');
    var pathJSMin = $.path.join(dest, '*.min.js');
    var ignore = '!(' + pathJSMap + '|' + pathJSMin + ')';

    var stream = gulp.src([match, ignore]).pipe((0, _gulpRename2.default)(function (path) {
      path.basename += '.min';
    })).pipe((0, _gulpBabelMinify2.default)({
      mangle: {
        keepClassName: true
      }
    })).pipe(gulp.dest(paths.scripts.dest));

    return stream;
  }

  minifyJs.displayName = 'minify:js';
  return minifyJs;
};