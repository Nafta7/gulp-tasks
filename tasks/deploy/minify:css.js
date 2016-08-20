module.exports = function(gulp, paths, $){
  return function minify_css(cb){
    $.gutil.log('Minifying css from: ' + $.path.resolve(paths.styles.dest))
    var files = paths.styles.glob || '**/*'
    files += '.css'
    gulp.src($.path.join(paths.styles.dest, files))
    .pipe($.concat('all.css'))
    .pipe($.rename('all.min.css'))
    .pipe($.minifycss())
    .pipe(gulp.dest(paths.styles.dist))
    cb()
  };
}
