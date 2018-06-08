import pug from 'gulp-pug'

module.exports = function(gulp, paths, $) {
  function compilePug(cb) {
    if (!paths.templates) {
      $.gutil.log(
        `[${compilePug.displayName}] Warning: ` +
          `task did not complete because template paths are not defined.`
      )
      cb()
      return
    }

    let bsync = $.browserSync ? $.browserSync.stream : gutil.noop
    $.gutil.log(
      `[${compilePug.displayName}] ` +
        `Compiling templates from: ${paths.templates.src}`
    )
    let files = paths.templates.glob || '**/*'
    files += '.pug'
    var stream = gulp
      .src($.path.join(paths.templates.src, files))
      .pipe(
        pug({
          pretty: true
        })
      )
      .pipe(gulp.dest(paths.templates.dest))
      .pipe(bsync())

    return stream
  }

  compilePug.displayName = 'compile:pug'
  return compilePug
}
