'use strict';

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (gulp, paths, $) {
  function compileBabel() {
    if (!paths.scripts) {
      $.gutil.log('[' + compileBabel.displayName + '] Warning: ' + 'task did not complete because script paths are not defined.');
      cb();
      return;
    }

    var bsync = $.browserSync ? $.browserSync.stream : $.gutil.noop;
    var files = paths.scripts.glob || '*';
    files += '.js';

    var stream = gulp.src($.path.join(paths.scripts.src, files)).pipe((0, _gulpBabel2.default)()).pipe(gulp.dest(paths.scripts.dest)).pipe(bsync());

    return stream;
  }

  compileBabel.displayName = 'compile:babel';
  return compileBabel;
};