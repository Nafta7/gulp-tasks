import modula from 'modula-loader'
import loadPlugins from './load-plugins'

let plugins = loadPlugins()

function taskify(config){
  var opts = config.opts || {}
  var args = config.args || {}
  opts.es6 = opts.es6 === undefined ? true : opts.es6
  opts.exclude = opts.exclude || []

  opts.exclude = (opts.es6)
  ? opts.exclude.concat(['compile:es5'])
  : opts.exclude.concat(['compile:es6'])

  args.plugins = Object.assign(plugins, args.plugins)

  var modules = modula('tasks', {
    args: args,
    opts: {
      include: opts.include,
      exclude: opts.exclude,
      flat: opts.flat
    }
  })

  Object.keys(modules).forEach((key) => {
    if (modules[key] instanceof Function) {
      createTask(args.gulp, modules[key], key)
    }
  })

  return modules
}

function createTask(gulp, func, name){
  gulp.task(name, function(done){
    func()
    done()
  })
}

module.exports = taskify
