const pug = require('gulp-pug')

module.exports = function(gulp, paths, $) {
  function compilePug(cb) {
    if (!paths.templates) {
      $.util.log(
        `[${compilePug.displayName}] Warning: ` +
          `task did not complete because template paths are not defined.`
      )
      cb()
      return
    }

    let bsync = $.browserSync ? $.browserSync.stream : util.noop
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
