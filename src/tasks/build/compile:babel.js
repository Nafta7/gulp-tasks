import babel from 'gulp-babel'

module.exports = function(gulp, paths, $) {
  function compileBabel() {
    if (!paths.scripts) {
      $.gutil.log(
        `[${compileBabel.displayName}] Warning: ` +
          `task did not complete because script paths are not defined.`
      )
      cb()
      return
    }

    const bsync = $.browserSync ? $.browserSync.stream : $.gutil.noop
    let files = paths.scripts.glob || '*'
    files += '.js'

    let stream = gulp
      .src($.path.join(paths.scripts.src, files))
      .pipe(babel())
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(bsync())

    return stream
  }

  compileBabel.displayName = 'compile:babel'
  return compileBabel
}
