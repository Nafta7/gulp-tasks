import browserify from 'browserify'
import source from 'vinyl-source-stream'
import tap from 'gulp-tap'
import buffer from 'gulp-buffer'

module.exports = function(gulp, paths, $){
  function compileJSES5(){
    var bsync = $.browserSync ? $.browserSync.stream : $.gutil.noop
    var files = paths.scripts.glob || '*'
    files += '.js'
    var stream = gulp.src($.path.join(paths.scripts.src, files), {
      read: false,
      base: paths.scripts.src
    })
      .pipe(tap(function (file) {
        $.gutil.log('Bundling scripts from: ' + file.path);
        file.contents = browserify(file.path, {debug: true}).bundle();
      }))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.sourcemaps.write('./'))

      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(bsync())

    return stream
  }

  compileJSES5.displayName = 'compile:ES5'
  return compileJSES5
}

// Courtesy of gulpjs recipes
// http://gulpjs.org/recipes/browserify-multiple-destination.html
