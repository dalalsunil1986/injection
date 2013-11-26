Injection
=========

Simple dependency injection, everywhere you use JavaScript.

[jsFiddle Example](http://jsfiddle.net/andrewjmead/x23Cd/)

##Getting Started
Using Injection is simple. Setup your dependencies and resolve your functions dependencies! You can grab the code from ```/src/inject.js```.

###Add initial dependencies
	var inject = new Inject({
	  "url": "www.foo.bar"
	});

###Add additional dependencies
	inject.register('name', 'andrew');

You can also register asynchronous dependencies. You need to register a function as the value, and call the callback function with the data to store.

	inject.register('data', function (callback) {
        setTimeout(function () {
            callback('test')
        }, 500);
    });
	
###Resolve dependencies	
    function func (name, nonexistant, url) {
      console.log(name);  // > andrew
      console.log(nonexistant);  // > undefined
      console.log(url);  // > www.foo.bar
    }

	/* call function and inject dependencies */
	inject.resolve(func);
##API

```new Inject (initialDependencies)```
 - Setup your initial dependencies. The returned object will allow you to resolve dependencies, and register further dependencies.

```register (key, value)```
 - Add a new dependency to an existing instance. You can also override existing dependencies. For asynchronous dependencies, pass a function as the value (see example above).

```resolve (someFunction)```
 - Resolve dependencies for the function and call the function.

##License
The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
