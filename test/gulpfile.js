var gulp = require('gulp'),
    _ = require('lodash'),
    path = require('path'),
    browserSync = require('browser-sync').create(),
    $ = {},
    gulpAug = require('gulp-augments')(gulp)


$.browserSync = browserSync

var es6 = true
var scripts

if (es6) {
  scripts =  {
    src: 'src/es6',
    dest: 'dest/js',
    dist: 'dest/dist/js',
    glob: '*'
  }
}
else {
  scripts = {
    src: 'src/es5',
    dest: 'dest/js',
    dist: 'dest/dist/js',
    glob: '*'
  }
}

var paths = {
  dest: 'dest',
  dist: 'dist',
  styles: {
    src: 'src/sass',
    dest: 'dest/css',
    dist: 'dist',
    glob: '*'
  },
  scripts: scripts,
  templates: {
    src:'src/jade',
    dest: 'dest',
    dist: 'dist'
  },
  vendor: {
    scripts: {
      src: 'vendor/js',
      dest: 'dist/vendor'
    }
  },
}

var tasks = require('../index.js')(gulp, paths, $)

gulp.task('build', gulp.series('clean', gulp.parallel(tasks.build)))
gulp.task('deploy', gulp.parallel(tasks.deploy))



gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: './dest/'
    },
    files: [
      './css/**/*.css',
      './js/**/*.js',
      './jade/**/*.jade'
    ]
  })
})

gulp.task('watch', function(){
  gulp.watch(path.resolve(paths.styles.src, '**/*.scss'),
    gulp.series('compile:sass'))
  gulp.watch(path.resolve(paths.scripts.src, '**/*.js'),
    gulp.series('compile:js'))
  gulp.watch(path.resolve(paths.templates.src, '**/*.jade'),
    gulp.series('compile:jade'))
})

gulp.task('serve', gulp.series('build', gulp.parallel('watch', 'browser-sync')))
