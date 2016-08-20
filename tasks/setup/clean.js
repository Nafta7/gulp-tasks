var del = require('del')

module.exports = function(gulp, paths, $) {
  return function clean(cb){
    $.gutil.log('Cleaning working folders...');
    del($.path.join(paths.dest, '**/*'))
    del($.path.join(paths.dist, '**/*'))
    del($.path.join(paths.styles.dest, '**/*'))
    del($.path.join(paths.scripts.dest, '**/*'))
    del($.path.join(paths.templates.dest, '**/*'))
    cb()
  }
}
