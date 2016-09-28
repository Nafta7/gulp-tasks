'use strict';

var _gulpJade = require('gulp-jade');

var _gulpJade2 = _interopRequireDefault(_gulpJade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (gulp, paths, $) {
  function compileJade(cb) {
    if (!paths.templates) {
      $.gutil.log('[' + compileJade.displayName + '] Warning: ' + 'task did not complete because template paths are not defined.');
      cb();
      return;
    }

    var bsync = $.browserSync ? $.browserSync.stream : gutil.noop;
    $.gutil.log('[' + compileJade.displayName + '] ' + ('Compiling templates from: ' + paths.templates.src));
    var files = paths.templates.glob || '**/*';
    files += '.jade';
    var stream = gulp.src($.path.join(paths.templates.src, files)).pipe((0, _gulpJade2.default)({
      pretty: true
    })).pipe(gulp.dest(paths.templates.dest)).pipe(bsync());

    return stream;
  }

  compileJade.displayName = 'compile:jade';
  return compileJade;
};