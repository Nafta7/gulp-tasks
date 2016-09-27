var browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    tap = require('gulp-tap'),
    buffer = require('gulp-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path'),
    babelify = require('babelify')

module.exports = function(gulp, paths, $){
  function compileJSES6(){
    var bsync = $.browserSync ? $.browserSync.stream : $.gutil.noop
    var files = paths.scripts.glob || '*'
    files += '.js'
    var stream = gulp.src(path.join(paths.scripts.src, files), {
      read: false,
      base: paths.scripts.src
    })
      .pipe(tap(function (file) {
        $.gutil.log('Bundling scripts from: ' + file.path);
        file.contents = browserify(file.path, {debug: true})
        .transform(babelify, {
          presets: ['es2015']
        })
        .bundle()
      }))

      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))

      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(bsync())

    return stream
  }

  compileJSES6.displayName = 'compile:es6'
  return compileJSES6
}

// Courtesy of gulpjs recipes
// http://gulpjs.org/recipes/browserify-multiple-destination.html
