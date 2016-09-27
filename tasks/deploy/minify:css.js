module.exports = function(gulp, paths, $){
  function minifyCSS(){
    $.gutil.log('Minifying css from: ' + $.path.resolve(paths.styles.dest))
    var ignore
    var dest = paths.styles.dest
    var match = paths.styles.glob || '**/*'
    match += '.css'
    match = $.path.join(dest, match)
    ignore = '!' + '(' + $.path.join(dest, '*.min.css')
    ignore += '|' + $.path.join(dest, '*.css.map')
    ignore += ')'

    var stream = gulp.src([match, ignore])
      .pipe($.rename(function(path){
        path.basename += '.min'
      }))
      .pipe($.cleanCSS())
      .pipe(gulp.dest(paths.styles.dest))

    return stream
  }

  minifyCSS.displayName = 'minify:css'
  return minifyCSS
}
