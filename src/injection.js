'use strict';

/**
 * @class Inject
 * create an instance on inject to execute function
 *
 * @param data {object} initial dependencies
 */
function Inject(data) {
  this.dependencies = data || {};
}

/**
 * @method execute
 * process a function and inject its dependencies
 */
Inject.prototype.execute = function (func) {
  var that = this,
      deps = this._getDependencies(func);

  deps = deps.map(function (arg) {
    return that.dependencies[arg];
  });

  func.apply(undefined, deps);
};

/**
 * @method _getDependencies
 * internal method for parsing a functions for dependencies
 */
Inject.prototype._getDependencies = function (func) {
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
      fnStr = func.toString().replace(STRIP_COMMENTS, ''),
      result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g) || [];

  return result;
};

/**
 * @method register
 * register a new dependency
 *
 * @param key {string}
 * @param value {string}
 */
Inject.prototype.register = function (key, value) {
  this.dependencies[key] = value;
  return this;
};

/**
 * @example
 *
 *
 var apis = new Inject({
  url: '/api/v1'
});

 apis.register('saying', 'yo ho, yo ho!');

 apis.execute(function (saying, test, url) {
  console.log(saying); // > yo ho, yo ho!
  console.log(test); // > undefined
  console.log(url); // > /api/v1
});

 */

module.exports = Inject;