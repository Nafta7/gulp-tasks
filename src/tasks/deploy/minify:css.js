const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')

module.exports = function(gulp, paths, $) {
  function minifyCSS(cb) {
    if (!paths.styles) {
      $.util.log(
        `[${compileSass.displayName}] Warning: ` +
          `task did not complete because style paths are not defined.`
      )
      cb()
      return
    }

    let dest = paths.styles.dest
    let match = paths.styles.glob || '**/*'
    match += '.css'
    match = $.path.join(dest, match)
    const pathCSSMaps = $.path.join(dest, '*.css.map')
    const pathCSSMin = $.path.join(dest, '*.min.css')
    const ignore = `!(${pathCSSMin}|${pathCSSMaps})`

    var stream = gulp
      .src([match, ignore])
      .pipe(
        rename(function(path) {
          path.basename += '.min'
        })
      )
      .pipe(cleanCss())
      .pipe(gulp.dest(paths.styles.dest))

    return stream
  }

  minifyCSS.displayName = 'minify:css'
  return minifyCSS
}
