var gulp    = require('gulp'),
    modula  = require('modula-loader'),
    _       = require('lodash'),
    plugins = require('gulp-load-plugins')();
plugins.uglify = require('gulp-uglify');
plugins.minifycss = require('gulp-minify-css');


function tasks(gulp, path, p) {
  var $ = _.merge(plugins, p);
  var modules = modula('tasks', { gulp: gulp, path: path, $: $ });
  return modules;
}

module.exports = tasks;
