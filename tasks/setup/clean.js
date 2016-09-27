var del = require('del')

module.exports = function(gulp, paths, $) {
  function clean(){
    $.gutil.log('Cleaning working folders...');
    del($.path.join(paths.dest, '**/*'))
    del($.path.join(paths.styles.dest, '**/*'))
    del($.path.join(paths.scripts.dest, '**/*'))
    del($.path.join(paths.templates.dest, '**/*'))
  }

  clean.displayName = 'clean'
  return clean
}
