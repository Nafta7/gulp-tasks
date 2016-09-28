import concat from 'gulp-concat'

module.exports = function(gulp, paths, $){
  function compileVendorJS(cb){
    if (!paths.vendor)
    {
      $.gutil.log(`[${compileVendorJS.displayName}] Warning: `
        + `task did not complete because vendor script paths are not defined.`)
      cb()
      return
    }
    var bsync = $.browserSync ? $.browserSync.stream : gutil.noop
    $.gutil.log(`[${compileVendorJS.displayName}] `
      + `Compiling vendor scripts from: ${paths.vendor.scripts.src}`)
    var files = paths.vendor.scripts.glob || '**/*'
    files += '.js'
    var stream = gulp.src($.path.join(paths.vendor.scripts.src, files), {
      base: paths.vendor.scripts.src
    })
      .pipe(concat('vendor.all.js'))
      .pipe(gulp.dest(paths.vendor.scripts.dest))
      .pipe(bsync())

    return stream
  }

  compileVendorJS.displayName = 'compile:vendor:js'
  return compileVendorJS
}
