import sass from 'gulp-sass'

module.exports = function(gulp, paths, $){
  function compileSass(cb){
    if (!paths.styles) {
      $.gutil.log(`[${compileSass.displayName}] Warning: `
        + `task did not complete because style paths are not defined.`)
      cb()
      return
    }

    var bsync = $.browserSync ? $.browserSync.stream : gutil.noop
    $.gutil.log(`[${compileSass.displayName}] `
      + `Compiling styles from: ${paths.styles.src}`)
    var files = paths.styles.glob || '**/*'
    files += '.{sass,scss}'
    var stream = gulp.src($.path.join(paths.styles.src, files), {base: paths.styles.src})
      .pipe($.sourcemaps.init())
      .pipe(sass.sync())
      .pipe($.sourcemaps.write())
      .on('error', $.gutil.log.bind($.gutil, 'Sass Error'))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(bsync())

    return stream
  }

  compileSass.displayName = 'compile:sass'
  return compileSass
}
