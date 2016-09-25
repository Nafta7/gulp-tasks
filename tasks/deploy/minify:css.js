module.exports = function(gulp, paths, $){
  return function minify_css(cb){
    $.gutil.log('Minifying css from: ' + $.path.resolve(paths.styles.dest))
    var ignore
    var dest = paths.styles.dest
    var match = paths.styles.glob || '**/*'
    match += '.css'
    match = $.path.join(dest, match)
    ignore = '!' + '(' + $.path.join(dest, '*.min.css')
    ignore += '|' + $.path.join(dest, '*.css.map')
    ignore += ')'

    gulp.src([match, ignore])
    .pipe($.rename(function(path){
      path.basename += '.min'
    }))
    .pipe($.minifycss())
    .pipe(gulp.dest(paths.styles.dest))
    cb()
  }
}
