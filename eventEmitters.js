// from: https://nodejs.dev/en/api/v19/events/

const {EventEmitter} = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.emit('event');

// Passing arguments and 'this' to listeners:
myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
  // Prints:
  //   a b MyEmitter {
  //     _events: [Object: null prototype] { event: [Function (anonymous)] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined,
  //     [Symbol(kCapture)]: false
  //   } true
});

// myEmitter.emit('event', 'a', 'b');

// It is possible to use ES6 Arrow Functions as listeners, however, when doing so, the this keyword will no longer reference the EventEmitter instance:
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // Prints: a b {}
});

// myEmitter.emit('event', 'a', 'b');

// Asynchronous vs. synchronous
myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('this happens immediately but asynchronously',a,b);
  });
  setTimeout(()=>{
    console.log("this return after 2 seconds...",a,b)
  }, 2000)
});

// myEmitter.emit('event', 'anand', 'atul');

// Handling events only once
myEmitter.once('event', () => {
  console.log(++m);
});
// myEmitter.emit('event');
// Prints: 1
// myEmitter.emit('event');
// Ignored

// Error events:
myEmitter.on("error", (error)=>{
  console.log("Error: ", error.message);
})

myEmitter.on(errorMonitor, (err) => {
  MyMonitoringTool.log(err);
});

myEmitter.emit('error', new Error('whoops!'));
myEmitter.emit('event');

// Capture rejections of promises
const ee = new EventEmitter();
ee.on('something', async (value) => {
  throw new Error('kaboom');
});