Injection
=========

Simple dependency injection.


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

### Constructor
Setup your initial dependencies. You can register dependencies at any time using ```register(key, value)```.

**Params**
> obj {Object} - an object containing your initial dependencies

### execute (someFunction)
Call the provided function, passing in it dependencies.

**params**
> func {Function}

### register (key, value)
Add a new dependency to an existing instance of Injection.

**params**
> key {String} 

> value {Any}