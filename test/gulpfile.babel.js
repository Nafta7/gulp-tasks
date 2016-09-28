import gulp from 'gulp'
import path from 'path'
import browserSync from 'browser-sync'
import gulpAlg from 'gulp-augments'
import gutaska from '../lib/gutaska'

browserSync.create()
gulpAlg(gulp)

let $ = {}
$.browserSync = browserSync

let es6 = true
let scripts

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

let tasks = gutaska({
  args: {
    gulp: gulp,
    paths: paths,
    plugins: $
  }
})

let buildTasks = Object.keys(tasks.build).map(k => tasks.build[k])
let deployTasks = Object.keys(tasks.deploy).map(k => tasks.deploy[k])

gulp.task('build', gulp.series('clean', gulp.parallel(buildTasks)))
gulp.task('deploy', gulp.series('clean', buildTasks, gulp.parallel(deployTasks)))
//
// gulp.task('browser-sync', function(){
//   browserSync.init({
//     server: {
//       baseDir: './dest/'
//     },
//     files: [
//       './css/**/*.css',
//       './js/**/*.js',
//       './jade/**/*.jade'
//     ]
//   })
// })
//
// gulp.task('watch', function(){
//   gulp.watch(path.resolve(paths.styles.src, '**/*.scss'),
//     gulp.series('compile:sass'))
//   gulp.watch(path.resolve(paths.scripts.src, '**/*.js'),
//     gulp.series('compile:es6'))
//   gulp.watch(path.resolve(paths.templates.src, '**/*.jade'),
//     gulp.series('compile:jade'))
// })

// gulp.task('serve', gulp.series('build',
//   gulp.parallel('watch', 'browser-sync')
// ))
