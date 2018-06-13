const del = require('del')

module.exports = function(gulp, paths, $) {
  function clean() {
    if (paths && paths.dest) del($.path.join(paths.dest, '**/*'))
    if (paths.styles) del($.path.join(paths.styles.dest, '**/*'))
    if (paths.scripts) del($.path.join(paths.scripts.dest, '**/*'))
    if (paths.templates) del($.path.join(paths.templates.dest, '**/*'))
  }

  clean.displayName = 'clean'
  return clean
}
