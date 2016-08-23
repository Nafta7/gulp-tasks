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
## Install

For now use the github repo to install `gutaska`,
once I feel satisfied with the project, if ever,
I will submit it to the npm registry.

````bash
npm install https://github.com/Nafta7/gutaska.git --save
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
    dest: 'dest/sass',
    dist: 'dist'
  },
  scripts: {
    src: 'src/js',
    dest: 'dest/scripts',
    dist: 'dist'
  },
  templates: {
    src: 'src/jade',
    dest: 'dest/',
  },
  vendor: {
    scripts: {
      src: 'vendor/scripts',
      dest: 'dest/js',
      dist: 'dist'
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
  build: [
    'compile:jade',
    'compile:js',
    'compile:sass',
    'compile:vendor:js'
  ],
  deploy: [
    'minify:css',
    'minify:js'
  ],
  setup: ['clean']  
}
```

Which gives you the ability to access grouped tasks
in arrays that can be performed independent of another.

## Parallel tasks

As we have an array of tasks that can be performed
in parallel we can do something like this:

```js
gulp.task('build', gulp.series('clean', gulp.parallel(tasks.build)))
gulp.task('deploy', gulp.parallel(tasks.deploy))
```

## Serial & parallel tasks

Unfortunately I wasn't able to combine sequential tasks
using the current alpha version of Gulp 4,
but I will be looking into it.

## License

MIT
