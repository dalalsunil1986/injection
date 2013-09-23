Injection
=========

Simple dependency injection.

[jsFiddle Example](http://jsfiddle.net/andrewjmead/x23Cd/)

##Getting Started
Using Injection is simple. Setup your dependencies and execute your functions!

	/* setup initial dependencies */
	var inject = new Inject({
	  "url": "www.foo.bar"
	});

	/* add another dependency after initialization */
	inject.register('name', 'andrew');
	
	function func (name, nonexistant, url) {
	  console.log(name);          // > andrew
	  console.log(nonexistant);  // > undefined
	  console.log(url);          // > www.foo.bar
	}
	
	/* call function and inject dependencies */
	inject.execute(func);

##API

```new Inject (initialDependencies)```
 - Setup your initial dependencies. The returned object will allow you to resolve dependencies, and register further dependencies. You can register dependencies at any time using ```register(key, value)```. 

```register (key, value)```
 - Add a new dependency to an existing instance. You can also override existing dependencies

```execute (someFunction)```
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