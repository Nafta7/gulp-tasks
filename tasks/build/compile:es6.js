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
  return function compile_js_es6(cb){
    var bsync = $.browserSync ? $.browserSync.stream : $.gutil.noop
    var files = paths.scripts.glob || '*'
    files += '.js'
    gulp.src(path.join(paths.scripts.src, files), {
      read: false,
      base: paths.scripts.src
    })
        // transform file objects using gulp-tap plugin
        .pipe(tap(function (file) {
          $.gutil.log('Bundling scripts from: ' + file.path);
          // replace file contents with browserify's bundle stream
          file.contents = browserify(file.path, {debug: true})
          .transform(babelify, {
            presets: ['es2015']
          })
          .bundle()
        }))

        // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
        .pipe(buffer())

        // load and init sourcemaps
        .pipe(sourcemaps.init({loadMaps: true}))

        // .pipe(uglify())

        // write sourcemaps
        .pipe(sourcemaps.write('./'))

        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(bsync())
        cb()
  };
}

// Courtesy of gulpjs recipes
// http://gulpjs.org/recipes/browserify-multiple-destination.html
