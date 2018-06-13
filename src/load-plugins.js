const log = require('fancy-log')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const path = require('path')
const noop = require('through2')

function loadPlugins(plugins) {
  plugins = plugins || {}
  plugins.path = path
  plugins.util = {}
  plugins.util.log = log
  plugins.util.noop = noop
  plugins.sourcemaps = sourcemaps
  plugins.rename = rename
  return plugins
}

module.exports = loadPlugins
