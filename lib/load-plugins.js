'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadPlugins(plugins) {
  plugins = plugins || {};
  plugins.path = _path2.default;
  plugins.gutil = _gulpUtil2.default;
  plugins.sourcemaps = _gulpSourcemaps2.default;
  plugins.rename = _gulpRename2.default;
  return plugins;
}

exports.default = loadPlugins;