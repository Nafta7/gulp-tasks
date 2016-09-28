'use strict';

var _modulaLoader = require('modula-loader');

var _modulaLoader2 = _interopRequireDefault(_modulaLoader);

var _loadPlugins = require('./load-plugins');

var _loadPlugins2 = _interopRequireDefault(_loadPlugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = (0, _loadPlugins2.default)();

function taskify(config) {
  var opts = config.opts || {};
  var args = config.args || {};
  opts.es6 = opts.es6 === undefined ? true : opts.es6;
  opts.exclude = opts.exclude || [];

  opts.exclude = opts.es6 ? opts.exclude.concat(['compile:es5']) : opts.exclude.concat(['compile:es6']);

  args.plugins = Object.assign(plugins, args.plugins);

  var modules = (0, _modulaLoader2.default)('../tasks', {
    args: args,
    opts: {
      include: opts.include,
      exclude: opts.exclude,
      flat: opts.flat
    }
  });

  Object.keys(modules).forEach(function (key) {
    if (modules[key] instanceof Function) {
      createTask(args.gulp, modules[key], key);
    }
  });

  return modules;
}

function createTask(gulp, func, name) {
  gulp.task(name, function (done) {
    func();
    done();
  });
}

module.exports = taskify;