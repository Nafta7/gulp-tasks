module.exports = function(gulp, paths, $) {
  return function compile_jade(cb){
    var bsync = $.browserSync ? $.browserSync.stream : gutil.noop
    $.gutil.log('Compiling templates from: ' + $.path.resolve(paths.templates.src))
    var files = paths.templates.glob || '**/*'
    files += '.jade'
    gulp.src($.path.join(paths.templates.src, files))
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.templates.dest))
    .pipe(bsync())
    cb()
  }
}
