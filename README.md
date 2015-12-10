# gutaska

> A collection of common gulp tasks-as-modules.

## Available modules

 - (build/)compile:js
 - (build/)compile:sass
 - (build/)compile:jade
 - (deploy/)minify:js
 - (deploy/)minify:css

## Usage

`gutaska` require gulp, a hash of paths for each asset and another for plugins. Note that `gutaska` already load the required plugins for each task so is not necessary to pass them, with the exception of browserSync to allow livereload in the browser.

```js
var gutaska = require('gutaska');
var modules = gulpTasks(gulp, path, plugins); 
```

## Example

```js
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    gulpTasks = require('gutaska'),
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

var modules = gutaska(gulp, path, plugins);
```

`gutaska` will return the following hash:

```js
{
  'compile:js': [Function],
  'compile:sass': [Function],
  'compile:jade': [Function],
  build: {
    'compile:js': Function],
    'compile_sass': [Function],
    'compile_jade': [Function]
  },
  'minify:css': [Function],
  'minify:js': [Function],
  deploy: {
    'minify:css': [Function],
    'minify:js': [Function]
  }
}
```

Which gives you the ability to access any module by simply writing
`modules[name]` or choosing grouped tasks using `modules.build` and
`modules.deploy`. 

Task creation is entirely up to you, what gulpTasks provides is a
collection of common tasks as true modules.

Now for example, if we were to create a gulp task for each one of the
modules, we could do the folowing:

```js
var build  = _.keys(_.forIn(tasks.build,  createTask));
var deploy = _.keys(_.forIn(tasks.deploy, createTask));

function createTask(func, name){
  gulp.task(name, func);
}
```

And finally:

```js
gulp.task('build', build);
gulp.task('deploy', build.concat(deploy));
```

## License

MIT
