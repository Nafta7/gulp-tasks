module.exports = function(gulp, paths, $) {
  function compileJade(){
    var bsync = $.browserSync ? $.browserSync.stream : gutil.noop
    $.gutil.log('Compiling templates from: ' + $.path.resolve(paths.templates.src))
    var files = paths.templates.glob || '**/*'
    files += '.jade'
    var stream = gulp.src($.path.join(paths.templates.src, files))
      .pipe($.jade({
        pretty: true
      }))
      .pipe(gulp.dest(paths.templates.dest))
      .pipe(bsync())

    return stream
  }

  compileJade.displayName = 'compile:jade'
  return compileJade
}
