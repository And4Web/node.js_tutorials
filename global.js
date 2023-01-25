// The Timers module in Node.js contains various functions that allow us to execute a block of code or a function after a set period of time. The Timers module is global, we do not need to use require() to import it.

// Timers module has the following functions:

// Scheduling Timers: It is used to call a function after a set period of time.
// setImmediate()
// setInterval()
// setTimeout()
// Cancelling Timers: It is used to cancel the scheduled timer.
// clearImmediate()
// clearInterval()
// clearTimeout()
// 1. setImmediate() method: It schedules the “immediate” execution of the callback after I/O events callbacks. In the following example, multiple setImmediate functions are called. Whenever we do these callback functions are queued for execution in the order in which they are created. The entire callback queue is processed after every event loop iteration. If an immediate timer is queued from inside an executing callback, that timer will not be triggered until the next event loop iteration.
setImmediate(function A() {
  setImmediate(function B() {
    console.log(1);
    setImmediate(function D() { 
      console.log(2);
    });
  });

  setImmediate(function C() {
    console.log(3);
    setImmediate(function E() { 
      console.log(4);
    });
  });
});

console.log('Started...');

// 2. setInterval() method: It repeats the execution of the callback after every t time in milliseconds passed as a parameter.
// Executed after every 1000 milliseconds
// from the start of the program
setInterval(function A() {
  return console.log('Hello World!');
}, 1000);

// Executed right away
console.log('Executed before A...');

// 3. setTimeout() method: It schedules the execution of the callback after a certain time in milliseconds which is passed as a parameter.
// Executed after 3000 milliseconds 
// from the start of the program
setTimeout(function A() {
  return console.log('Hello World!');
}, 3000);

// executed right away
console.log('Executed before A...');

// 4. clearImmediate() method: It is used to simply cancel the Immediate object created by setImmediate() method.
var si = setImmediate(function A() {
  console.log(1);
});

// clears setInterval si
clearImmediate(si);

console.log(2);

// 5. clearInterval() method: It is used to cancel the Immediate object created by setInterval() method.
var si = setInterval(function A() {
  return console.log("Hello World!");
}, 500);

setTimeout(function() {
  clearInterval(si);
}, 2000);

// 6. clearTimeout() method: It is used to cancel the Immediate object created by setTimeout() method.
// si1 is cleared by clearTimeout()
var si1 = setTimeout(function A() {
  return console.log("Hello World!");
}, 3000);

// only si2 is executed
var si2 = setTimeout(function B() {
  return console.log("Hello Geeks!");
}, 3000);

clearTimeout(si1);
/************************************************/

// Import and Export in Node.js

// read from: https://www.geeksforgeeks.org/import-and-export-in-node-js/

/************************************************/

// Node.js URL() Method
// The ‘url’ module provides utilities for URL resolution and parsing. The getters and setters implement the properties of URL objects on the class prototype, and the URL class is available on the global object.

// The new URL() (Added in v7.0.0, v6.13.0) method is an inbuilt application programming interface of the URL module which creates a new URL object by parsing the input relative to the base. If the base is passed as a string, it will be parsed equivalent to new URL(base).

// Syntax:

// new URL(input[, base])

// Parameters: This method accepts two parameters as mentioned above and described below:

// input <string>: It is the input which is string type that is used to parse the absolute or relative input URL. The base is required if the input is relative and ignored if the input is absolute.

// base <string> | <URL>: It is the base URL which is either of string type or URL, used to resolve against if the input is absolute or not.

// Return Value: It returns the new URL generated along with an array of data like hostname, protocol, pathname, etc. 

// Node.js program to demonstrate the 
// new URL() method 
  
// Using require to access url module 
// const url = require('url');
  
const newUrl = new URL(
    'https://geeksforgeeks.org/p/a/t/h?query=string#hash');
  
// url array in JSON Format
console.log(newUrl);
  
const myUR = url.parse(
    'https://geeksforgeeks.org/:3000/p/a/t/h?query=string#hash');
console.log(myUR);
console.log(URL === require('url').URL);
  
const myURL1 = new URL(
    { toString: () => 'https://geeksforgeeks.org/' });
  
console.log(myURL1.href)
/*******************************************************/
// Node.js URLsearchParams API
// Node.js is an open-source project widely used for the development of dynamic web applications. The URLSearchParams API in Node.js allows read and write operations on the URL query.
// The URLSearchParams class is a global object and used with one of the four following constructors.
// Constructors:
// 1.new URLSearchParams(): No argument constructor instantiates a new empty URLSearchParams object.
// 2.new URLSearchParams(string): Accepts a string as an argument to instantiate a new URLSearchParams object.
var params = new URLSearchParams('user=abc&q=xyz');
console.log(params.get('user'));
console.log(params.get('q'));

// 3.new URLSearchParams(obj): Accepts an object with a collection of key-value pairs to instantiate a new URLSearchParams object. The key-value pair of obj are always coerced to strings. Duplicate keys are not allowed.
const params = new URLSearchParams({
  user: 'ana',
  course: ['math', 'chem', 'phys']
});
console.log(params.toString());

// 4.new URLSearchParams(iterable): Accepts an iterable object having a collection of key-value pairs to instantiate a new URLSearchParams object. Iterable can be any iterable object. Since URLSearchParams is iterable, an iterable object can be another URLSearchParams, where the constructor will create a clone of the provided URLSearchParams. Duplicate keys are allowed.
// Using a Map object as it is iterable
const map = new Map();
map.set('West Bengal', 'Kolkata');
map.set('Karnataka', 'Bengaluru');
params = new URLSearchParams(map);
console.log(params.toString());

// Accessing the URL query:
// urlSearchParams.get(name): Returns the value of the first name-value pair that matches with the argument passed. If no such pair exists, null is returned.
const myURL2 = new URL(
  'https://example.org/?abc=123&abc=526');
  
console.log(myURL.searchParams.get('abc'));
// urlSearchParams.getAll(name): Returns all the value of the name-value pair that matches with the argument passed. If no such pair exists, null is returned.
const myURL3 = new URL(
  'https://example.org/?abc=123&abc=526');
console.log(myURL.searchParams.getAll('abc'));
// urlSearchParams.has(name): Returns true if the argument passed matches with any existing name of the name-value pair else returns false.
const myURL4 = new URL(
  'https://example.org/?abc=123&xyz=526');
console.log(myURL.searchParams.has('abc'));
console.log(myURL.searchParams.has('pqr'));

// Manipulating the URL query:
// urlSearchParams.set(name, value): Sets the value in the URLSearchParams object associated with name to the specified value. If more than one name-value pairs exists, whose names are same as the ‘name’ argument, then the only value of first matching pair is changed, rest all are removed.
const params = new URLSearchParams(
  'abc=123&xyz=526&abc=258');
console.log(params.toString());
params.set('abc', 'opq');
console.log(params.toString());

// urlSearchParams.append(name, value): Appends a new name-value pair to the existing URLSearchParams query.
const params = new URLSearchParams('xyz=123');
params.append('foo', '789');
params.append('xyz', 'zoo');
params.append('foo', 'def');
console.log(params.toString());

// urlSearchParams.delete(name): Removes all name-value pairs whose name is same as ‘name’ argument.
const params = new URLSearchParams(
  'xyz=123&foo=789&xyz=zoo&foo=def');
console.log(params.toString());
params.delete('foo');
console.log(params.toString());

// urlSearchParams.sort(): Sorts the existing name-value pairs in-place by their names using a stable sorting algorithm.
const params = new URLSearchParams(
  'query=node&type=search&abc=programs');
params.sort();
console.log(params.toString());

// urlSearchParams.toString(): Returns the URL search parameters as a string, with characters percent-encoded wherever necessary.
const params = new URLSearchParams(
  'query=node&type=search&passwd[]=3456');
console.log(params.toString());

// Iterating the URL query:
// urlSearchParams.entries(): Returns an iterator over the entry set of the param object.
const params = new URLSearchParams(
  'query=node&type=search&passwd=3456');
for(var pair of params.entries()) {
 console.log(pair[0]+ '-->'+ pair[1]); 
}
// urlSearchParams.keys(): Returns an iterator over the key set of the param object.
const params = new URLSearchParams(
  'query=node&type=search&passwd=3456');
for(var key of params.keys()) {
 console.log(key); 
}
// urlSearchParams.values(): Returns an iterator over the value set of the param object.
const params = new URLSearchParams(
  'query=node&type=search&passwd=3456');
for(var value of params.values()) {
 console.log(value); 
}
// urlSearchParams.forEach(fn[, arg]): fn is a function invoked for each name-value pair in the query and arg is an object to be used when ‘fn’ is called. It iterates over each name-value pair in the query and invokes the function.
const myURL = new URL(
  'https://example.com/?a=b&c=d&d=z');
myURL.searchParams.forEach(
  (value, name, searchParams) => {
console.log(name, value, 
  myURL.searchParams === searchParams);
});

// urlSearchParams[Symbol.iterator]():
const params=new URLSearchParams(
  'firstname=john&lastname=beck&gender=male');
for (const [name, value] of params) {
console.log(name, value);
}

/************************************************/



/************************************************/
