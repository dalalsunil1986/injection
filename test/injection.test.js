/**
 * test suite for injeciton
 */

var Inject = require('../src/injection'),
    should = require('should');

describe('Injection', function () {

    /* tests for the constructor function */
    describe('#Injection', function () {

        it('should attach data to dependencies', function () {
            var obj = {"name": "andrew"},
                inject = new Inject(obj);

            inject.dependencies.should.eql(obj);
        });

        it('should default this.dependencies to obj if no defaults are provided', function () {
            var inject = new Inject();
            inject.dependencies.should.eql({});
        });

    });

    /* gets for getting functions deps */
    describe('#_getDependencies', function () {
        function func(one, two, three, a, b, c) {
        }

        it('should return an array of dependencies', function () {
            var result = Inject.prototype._getDependencies.call({dependencies: {}}, func);

            result.should.eql(['one', 'two', 'three', 'a', 'b', 'c'])
        });
    });

    describe('#register', function () {

        it('should add the key value pair to the dependencies', function () {
            var result = Inject.prototype.register.call({dependencies: {}}, '1', 'one');

            result.dependencies['1'].should.equal('one');
        });

    });

    it('should correctly inject dependencies', function () {
        var inject = new Inject({
            "name": "andrew"
        });

        function sayHi(name) {
            name.should.equal('andrew');
        }

        inject.resolve(sayHi);
    });

    it('should resolve aynchronous dependencies', function (callback) {
        var inject = new Inject({
            "something": function (callback) {
                setTimeout(function () {
                    callback('test')
                }, 2000);
            }
        });

        function sayHi(something) {
            something.should.equal('test');
        }

        inject.resolve(sayHi);
    });

    it('should resolve undefined dependencies as undefined', function () {
        var inject = new Inject({
            "lastName": "name"
        });

        function sayHi(firstName, lastName) {
            should.not.exist(firstName);
            lastName.should.equal('name');
        }

        inject.resolve(sayHi);
    });

});