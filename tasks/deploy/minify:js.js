module.exports = function(gulp, paths, $){
  return function minify_js(cb){
    $.gutil.log('Minifying js from: ' +  $.path.resolve(paths.scripts.dest))
    var ignore
    var dest = paths.scripts.dest
    var match = paths.scripts.glob || '**/*'
    match += '.js'
    match = $.path.join(dest, match)
    ignore = '!' + '(' + $.path.join(dest, '*.min.js')
    ignore += '|' + $.path.join(dest, '*.js.map')
    ignore += ')'

    gulp.src([match, ignore])
    .pipe($.rename(function(path){
      path.basename += '.min'
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    cb()
  }
}
