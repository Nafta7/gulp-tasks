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
    dest: 'dest/js'
  }
}
else {
  scripts = {
    src: 'src/es5',
    dest: 'dest/js'
  }
}

var paths = {
  dest: 'dest',
  styles: {
    src: 'src/sass',
    dest: 'dest/css'
  },
  scripts: scripts,
  templates: {
    src:'src/jade',
    dest: 'dest'
  },
  vendor: {
    scripts: {
      src: 'vendor/js',
      dest: 'dest/vendor'
    }
  }
}

var tasks = require('../index.js')({
  args: {
    gulp: gulp,
    paths: paths,
    plugins: $
  }
})

var buildTasks = Object.keys(tasks.build).map(function(key) {
  return tasks.build[key]
})

var deployTasks = Object.keys(tasks.deploy).map(function(key){
  return tasks.deploy[key]
})

gulp.task('build', gulp.series('clean', gulp.parallel(buildTasks)))
gulp.task('deploy', gulp.series('clean', buildTasks, gulp.parallel(deployTasks)))

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
    gulp.series('compile:es6'))
  gulp.watch(path.resolve(paths.templates.src, '**/*.jade'),
    gulp.series('compile:jade'))
})

// gulp.task('serve', gulp.series('build',
//   gulp.parallel('watch', 'browser-sync')
// ))
