import concat from 'gulp-concat'

module.exports = function(gulp, paths, $){
  function compileVendorJS(){
    var bsync = $.browserSync ? $.browserSync.stream : gutil.noop
    $.gutil.log('Compiling vendor scripts from: ' + $.path.resolve(paths.styles.src))
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
