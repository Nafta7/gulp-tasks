# gutaska

> A collection of common gulp tasks.

## Available tasks

```
tasks
├── build
│    ├── compile:es5
│    ├── compile:es6
│    ├── compile:vendor:js
│    ├── compile:jade
│    └── compile:sass
└── deploy
│    ├── minify:css.js
│    └── minify:js.js
└── setup
     └── clean
```
## Installation

Install with npm.

```bash
npm install https://github.com/Nafta7/gutaska.git
```

## Usage

`gutaska` requires **gulp**, and a hash of **paths**.

```js
var tasks = require('gutaska')(gulp, paths);
```

## Paths

You should use **paths** to define the location
of your assets, where are the **sass** files located?
Where it should be compiled to? See an example below.

### Example

```js
var gulp = require('gulp');

var paths = {
  styles: {
    src: 'src/sass',  
    dest: 'dest/sass'
  },
  scripts: {
    src: 'src/js',
    dest: 'dest/scripts'
  },
  templates: {
    src: 'src/jade',
    dest: 'dest/'
  },
  vendor: {
    scripts: {
      src: 'vendor/scripts',
      dest: 'dest/js'
    }
  }
}

tasks = require('gutaska')(gulp, paths)

```
## Gulp tasks

`gutaska` automatically creates all the single tasks
that are available, you can check running the command:

```bash
gulp --tasks
```

It should look something like this:
```bash
├── clean
├── compile:jade
├── compile:js
├── compile:sass
├── compile:vendor:js
├── minify:css
└── minify:js
```

Which means you can execute any of the tasks from
the terminal. But what about the variable `tasks`?
It looks to be receiving something from our module.

Indeed. `gutaska` will return the following:

```js
{
  'compile:js': [Function],
  'compile:sass': [Function],
  build: {
    'compile:js': Function],
    'compile:sass': [Function]
  },
  'minify:css': [Function],
  'minify:js': [Function],
  deploy: {
    'minify:css': [Function],
    'minify:js': [Function]
  },
  setup: {
    'clean': [Function]
  }
}
```

## Serial & parallel tasks

Totally possible now.
Since `tasks` has access to all of the functions we can build
and array like the following and pass to `gulp.parallel` and/or `gulp-series`:

```js
let buildTasks = Object.keys(tasks.build).map(k => tasks.build[k])
let deployTasks = Object.keys(tasks.deploy).map(k => tasks.deploy[k])

gulp.task('build', gulp.series('clean', gulp.parallel(buildTasks)))
gulp.task('deploy', gulp.series('clean', buildTasks, gulp.parallel(deployTasks)))

```

## License

MIT
