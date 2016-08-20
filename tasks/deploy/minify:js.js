module.exports = function(gulp, paths, $){
  return function minify_js(cb){
    $.gutil.log('Minifying js from: ' +  $.path.resolve(paths.scripts.dest))
    var files = paths.scripts.glob || '**/*'
    files += '.js'
    gulp.src($.path.join(paths.scripts.dest, files))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.scripts.dist))
    cb()
  };
}
