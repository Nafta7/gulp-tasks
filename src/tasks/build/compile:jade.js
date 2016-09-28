import jade from 'gulp-jade'

module.exports = function(gulp, paths, $) {
  function compileJade(cb){
    if (!paths.templates) {
      $.gutil.log(`[${compileJade.displayName}] Warning: `
        + `task did not complete because template paths are not defined.`)
      cb()
      return
    }

    let bsync = $.browserSync ? $.browserSync.stream : gutil.noop
    $.gutil.log(`[${compileJade.displayName}] `
      + `Compiling templates from: ${paths.templates.src}`)
    let files = paths.templates.glob || '**/*'
    files += '.jade'
    var stream = gulp.src($.path.join(paths.templates.src, files))
      .pipe(jade({
        pretty: true
      }))
      .pipe(gulp.dest(paths.templates.dest))
      .pipe(bsync())

    return stream
  }

  compileJade.displayName = 'compile:jade'
  return compileJade
}
