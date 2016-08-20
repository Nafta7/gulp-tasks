module.exports = function(gulp, paths, $){
  return function compile_sass(cb){
    var bsync = $.browserSync ? $.browserSync.stream : gutil.noop
    $.gutil.log('Compiling styles from: ' + $.path.resolve(paths.styles.src))
    var files = paths.styles.glob || '**/*'
    files += '.{sass,scss}'
    gulp.src($.path.join(paths.styles.src, files), {base: paths.styles.src})
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.sourcemaps.write())
    .on('error', $.gutil.log.bind($.gutil, 'Sass Error'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bsync())
    cb()
  };
}
