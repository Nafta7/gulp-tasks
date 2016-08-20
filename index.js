var gulp    = require('gulp'),
    modula  = require('modula-loader'),
    _       = require('lodash'),
    plugins = require('gulp-load-plugins')()

plugins.uglify = require('gulp-uglify')
plugins.minifycss = require('gulp-minify-css')
plugins.path = require('path')
plugins.gutil = require('gulp-util')

function taskify(gulp, paths, p, opts){
  opts = opts || {es6: true}

  var $ = _.merge(plugins, p);
  var modules = modula('tasks', { gulp: gulp, paths: paths, $: $ });
  modules = filter(modules, opts)
  var obj = {}
  _.forOwn(modules, function(value, key){
    if (_.isFunction(value)){
      createTask(value, key)
      obj[key] = key
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

function filter(modules, opts){
  if (opts.es6) {
    modules['compile:js'] = modules['compile:es6']
    modules.build['compile:js'] = modules['compile:es6']
    delete modules['compile:es6']
    delete modules.build['compile:es6']
  }
  else {
    delete modules['compile:es6']
    delete modules.build['compile:es6']
  }
  return modules
}

module.exports = taskify
