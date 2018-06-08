import minify from 'gulp-babel-minify'
import rename from 'gulp-rename'

module.exports = function(gulp, paths, $) {
  function minifyJs(cb) {
    if (!paths.scripts) {
      $.gutil.log(
        `[${minifyJs.displayName}] Warning: ` +
          `task did not complete because script paths are not defined.`
      )
      cb()
      return
    }

    $.gutil.log(
      `[${minifyJs.displayName}] ` + `Minifying js from: ${paths.scripts.dest}`
    )
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
