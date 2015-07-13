# gulp-tasks

> A collection of common gulp tasks-as-modules.

## Available modules

 - (build/)compile:js
 - (build/)compile:sass
 - (build/)compile:jade
 - (deploy/)minify:js
 - (deploy/)minify:css

## Usage

`gulp-tasks` require gulp, a hash of paths for each asset and another for plugins. Note that gulp-task already load the necessary plugins for each tasks so is not necessary to pass them, the only necessary is browserSync to allow livereload in the browser.

```
var gulpTasks = require('gulp-tasks');
var modules = gulpTasks(gulp, path, plugins); 
```

## Example

 

```
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    gulpTasks = require('gulp-tasks'),
    _         = require('lodash');

var plugins = { browserSync: browserSync };

var path = {
  styles  : { src: 'styles/',  dest: 'www/styles/' },
  scripts : { src: 'scripts/', dest: 'www/scripts/', boot: 'app.js' },
  vendor: {
    scripts: { src: 'vendor/', dest: 'www/scripts/' }
  },
  templates: { src: 'views/', dest: 'www/', glob: '*.jade'  }
};

var tasks = gulpTasks(gulp, path, plugins);
var build  = _.keys(_.forIn(tasks.build,  createTask));
var deploy = _.keys(_.forIn(tasks.deploy, createTask));

gulp.task('build', build);
gulp.task('deploy', build.concat(deploy));

function createTask(func, name){
  gulp.task(name, func);
}

```