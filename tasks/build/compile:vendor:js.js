module.exports = function(gulp, paths, $){
  return function compile_vendor_js(cb){
    var bsync = $.browserSync ? $.browserSync.stream : gutil.noop
    $.gutil.log('Compiling vendor scripts from: ' + $.path.resolve(paths.styles.src))
    var files = paths.vendor.scripts.glob || '**/*'
    files += '*.js'
    gulp.src($.path.join(paths.vendor.scripts.src, files))
    .pipe($.concat('vendor.all.js'))
    .pipe(gulp.dest(paths.vendor.scripts.dest))
    .pipe(bsync())
    cb()
  }
}
