module.exports = function(gulp, paths, $){
  function minifyJS(){
    $.gutil.log('Minifying js from: ' +  $.path.resolve(paths.scripts.dest))
    var ignore
    var dest = paths.scripts.dest
    var match = paths.scripts.glob || '**/*'
    match += '.js'
    match = $.path.join(dest, match)
    ignore = '!' + '(' + $.path.join(dest, '*.min.js')
    ignore += '|' + $.path.join(dest, '*.js.map')
    ignore += ')'

    var stream = gulp.src([match, ignore])
      .pipe($.rename(function(path){
        path.basename += '.min'
      }))
      .pipe($.uglify())
      .pipe(gulp.dest(paths.scripts.dest))

    return stream
  }

  minifyJS.displayName = 'minify:js'
  return minifyJS
}
