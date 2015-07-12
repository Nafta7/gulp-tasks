var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.uglify = require('gulp-uglify');
plugins.minifycss = require('gulp-minify-css');

var modula = require('modula-loader');
var taska = require('taska');
var _ = require('lodash');

function gulpTasks(gulp, path, p) {
  var $ = _.merge(plugins, p);

  var modules = modula('tasks', { gulp: gulp, path: path, $: $ });
  var build  = taska(modules.build,  createTask);
  var deploy = taska(modules.deploy, createTask);
  gulp.task('build', build);
  gulp.task('deploy', build.concat(deploy));

  return modules;
}

function createTask(name, func){
  gulp.task(name, func);
}

module.exports = gulpTasks;
