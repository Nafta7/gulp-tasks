module.exports = function(gulp, path, $) {
  return function(){
    gulp.src(path.templates.src + path.templates.glob)
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest(path.templates.dest))
    .pipe($.browserSync.stream());
  };
}
