'use strict';

/**
 * @class Inject
 * create an instance on inject to resolve function
 *
 * @param data {object} initial dependencies
 */
function Inject(data) {
  this.dependencies = data || {};
}

/**
 * @method resolve
 * call a function with resolved dependencies
 *
 * @param func {Function} - function to call with injected dependencies
 */
Inject.prototype.resolve = function (func) {
  var that = this,
      deps = this._getDependencies(func);

  deps = deps.map(function (arg) {
    return that.dependencies[arg];
  });

  func.apply(undefined, deps);
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
 * @method _getDependencies
 * internal method for parsing a functions for dependencies
 *
 * @param func {function} - function to get dependencies for
 *
 * @return {Array} - array of parameters
 */
Inject.prototype._getDependencies = function (func) {
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
      fnStr = func.toString().replace(STRIP_COMMENTS, ''),
      result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g) || [];

  return result;
};

module.exports = Inject;