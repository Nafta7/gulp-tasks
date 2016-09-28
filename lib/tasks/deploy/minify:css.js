'use strict';

var _gulpCleanCss = require('gulp-clean-css');

var _gulpCleanCss2 = _interopRequireDefault(_gulpCleanCss);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (gulp, paths, $) {
  function minifyCSS(cb) {
    if (!paths.styles) {
      $.gutil.log('[' + compileSass.displayName + '] Warning: ' + 'task did not complete because style paths are not defined.');
      cb();
      return;
    }

    $.gutil.log('[' + minifyCSS.displayName + '] ' + ('Minifying css from: ' + paths.styles.dest));
    var dest = paths.styles.dest;
    var match = paths.styles.glob || '**/*';
    match += '.css';
    match = $.path.join(dest, match);
    var pathCSSMaps = $.path.join(dest, '*.css.map');
    var pathCSSMin = $.path.join(dest, '*.min.css');
    var ignore = '!(' + pathCSSMin + '|' + pathCSSMaps + ')';

    var stream = gulp.src([match, ignore]).pipe((0, _gulpRename2.default)(function (path) {
      path.basename += '.min';
    })).pipe((0, _gulpCleanCss2.default)()).pipe(gulp.dest(paths.styles.dest));

    return stream;
  }

  minifyCSS.displayName = 'minify:css';
  return minifyCSS;
};