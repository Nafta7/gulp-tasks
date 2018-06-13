const minify = require('gulp-babel-minify')
const rename = require('gulp-rename')

module.exports = function(gulp, paths, $) {
  function minifyJs(cb) {
    if (!paths.scripts) {
      $.util.log(
        `[${minifyJs.displayName}] Warning: ` +
          `task did not complete because script paths are not defined.`
      )
      cb()
      return
    }

    let dest = paths.scripts.dest
    let match = paths.scripts.glob || '**/*'
    match += '.js'
    match = $.path.join(dest, match)
    const pathJSMap = $.path.join(dest, '*.js.map')
    const pathJSMin = $.path.join(dest, '*.min.js')
    const ignore = `!(${pathJSMap}|${pathJSMin})`

    var stream = gulp
      .src([match, ignore])
      .pipe(
        rename(function(path) {
          path.basename += '.min'
        })
      )
      .pipe(
        minify({
          mangle: {
            keepClassName: true
          }
        })
      )
      .pipe(gulp.dest(paths.scripts.dest))

    return stream
  }

  minifyJs.displayName = 'minify:js'
  return minifyJs
}
