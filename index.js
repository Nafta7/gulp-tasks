var gulp    = require('gulp'),
    modula  = require('modula-loader'),
    _       = require('lodash'),
    plugins = require('gulp-load-plugins')()

plugins.uglify = require('gulp-uglify')
plugins.minifycss = require('gulp-minify-css')
plugins.path = require('path')
plugins.gutil = require('gulp-util')

function taskify(config){
  var opts = config.opts || {}
  var args = config.args || {}
  opts.es6 = opts.es6 === undefined ? true : opts.es6
  opts.exclude = opts.exclude || []

  opts.exclude = (opts.es6)
    ? opts.exclude.concat(['compile:es5'])
    : opts.exclude.concat(['compile:es6'])

  args.plugins = _.merge(plugins, args.plugins);
  var modules = modula('tasks', {
    args: args,
    opts: {
      include: opts.include,
      exclude: opts.exclude,
      flat: opts.flat
    }
  })

  var obj = {}
  _.forOwn(modules, function(value, key){
    if (_.isFunction(value)){
      createTask(value, key)
    }
    else if (_.isObject(value)) {
      obj[key] = _.keys(value)
    }
  })

  return obj

  function createTask(func, name){
    gulp.task(name, function(done){
      func(done)
    })
  }
}

module.exports = taskify
