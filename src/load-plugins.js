import path from 'path'
import gutil from 'gulp-util'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'

function loadPlugins(plugins) {
  plugins = plugins || {}
  plugins.path = path
  plugins.gutil = gutil
  plugins.sourcemaps = sourcemaps
  plugins.rename = rename
  return plugins
}

module.exports = loadPlugins
