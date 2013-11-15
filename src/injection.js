'use strict';

(function () {
    /**
     * @class Checkin
     */
    function Checkin (count, per, final) {
        this.finalCount = count;
        this.count = 0;
        this.per = per;
        this.final = final;
    }

    Checkin.prototype.checkin = function () {
        if (this.count >= this.finalCount) {
            return;
        }

        this.per.apply(this, arguments);
        this.count++;

        if (this.count === this.finalCount) {
            this.final();
        }
    };

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

        if (deps.length === 0) {
            func.apply(undefined);
            return;
        }

        var resolvedDeps = [];
        var checkin = new Checkin(deps.length, function (key, val) {
            var index = deps.indexOf(key);
            resolvedDeps[index] = val;
        }, function () {
            func.apply(undefined, resolvedDeps);
        });

        deps.map(function (arg) {
            if (that.dependencies[arg] instanceof Function) {
                that.dependencies[arg](function (finalVal) {
                    checkin.checkin(arg, finalVal);
                });
            } else {
                checkin.checkin(arg, that.dependencies[arg]);
            }
        });
    };

    /**
     * @method register
     * register a new dependency
     *
     * @param key {string}
     * @param value {string|Function}
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

    if (typeof window !== 'undefined') {
        window.Inject = Inject;
    } else {
        module.exports = Inject;
    }
}).call(this);