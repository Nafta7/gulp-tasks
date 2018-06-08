'use strict';

var _gulpPug = require('gulp-pug');

var _gulpPug2 = _interopRequireDefault(_gulpPug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (gulp, paths, $) {
  function compilePug(cb) {
    if (!paths.templates) {
      $.gutil.log('[' + compilePug.displayName + '] Warning: ' + 'task did not complete because template paths are not defined.');
      cb();
      return;
    }

    var bsync = $.browserSync ? $.browserSync.stream : gutil.noop;
    $.gutil.log('[' + compilePug.displayName + '] ' + ('Compiling templates from: ' + paths.templates.src));
    var files = paths.templates.glob || '**/*';
    files += '.pug';
    var stream = gulp.src($.path.join(paths.templates.src, files)).pipe((0, _gulpPug2.default)({
      pretty: true
    })).pipe(gulp.dest(paths.templates.dest)).pipe(bsync());

    return stream;
  }

  compilePug.displayName = 'compile:pug';
  return compilePug;
};