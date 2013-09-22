'use strict';

/**
 * @class Inject
 * create an instance on inject to execute function
 *
 * @param data {object} initial dependencies
 */
function Inject(data) {
  this.dependencies = data;
}


/**
 * @method execute
 * process a function and inject its dependencies
 */
Inject.prototype.execute = function (func) {
  func.apply(undefined,
      this._getDependencies(func)
  );
};


/**
 * @method _getDependencies
 * internal method for parsing a functions for dependencies
 */
Inject.prototype._getDependencies = function (func) {
  var that = this,
      STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
      fnStr = func.toString().replace(STRIP_COMMENTS, ''),
      result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g) || [];

  return result.map(function (arg) {
    return that.dependencies[arg];
  });
};


/**
 * @method register
 * register a new dependency
 */
Inject.prototype.register = function (key, val) {
  return this.dependencies[key] = val;
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