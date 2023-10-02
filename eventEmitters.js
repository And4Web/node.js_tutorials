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

// When an error occurs within an EventEmitter instance, the typical action is for an 'error' event to be emitted. These are treated as special cases within Node.js.

//If an EventEmitter does not have at least one listener registered for the 'error' event, and an 'error' event is emitted, the error is thrown, a stack trace is printed, and the Node.js process exits.
const ee = new EventEmitter();

ee.on('something', function(value){
  try{  
     console.log(`something done! value >>> ${value} `)    
 }catch(err){
   console.log(err.message)
 }
 }) 
 ee.on('error', function(err){  
     console.log(err.message) 
 })
 
 const err = new Error("this is an Error...");
 // err.name = "SampleError";
 
 if(1 === true){
   ee.emit('something', "the value is great!");
 }else{
   ee.emit('error', new Error(err))
 }
// To guard against crashing the Node.js process the domain module can be used. (Note, however, that the node:domain module is deprecated.)
// As a best practice, listeners should always be added for the 'error' events.


// Capture rejections of promises

ee.on('something', async (err, value) => {
  if(err){
    throw new Error('kaboom');
  }else{
    console.log(value)
  }
});

ee.emit('something', null, "something printed...")

ee.on('something1', async(value)=>{
  throw new Error('boom...')
})

ee.emit('something1', null, "the value is great!");
ee.emit('error', new Error(err))

const ee1 = new EventEmitter({captureRejections: true});
ee1.on('something', async(value)=>{
  throw new Error('Jhinga la la Error...')
})
ee1.on('error', (err)=>{console.log(err)})

ee1.emit('something', 'let\'s do it.')
ee1.emit('error', new Error('fir se crash ho gaya...'))
// ee1[Symbol.for('nodejs.rejection')] = console.log;

// All EventEmitters emit the event 'newListener' when new listeners are added and 'removeListener' when existing listeners are removed.

// The EventEmitter instance will emit its own 'newListener' event before a listener is added to its internal array of listeners.

// Listeners registered for the 'newListener' event are passed the event name and a reference to the listener being added.
ee.once('newListener', (event, listener)=>{
  if(event === 'anand'){
    ee.on('anand', ()=>{
      console.log('welcome Anand!')
    })
  }
})

ee.on('anand', ()=>{
  console.log('We hire you as our Full stack developer...')
})

ee.emit('anand')

// emit(eventName [, ...args])

// Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.

// Returns true if the event had listeners, false otherwise.

ee.on('emit', function firstListener(){
  console.log("I'm the first listener")
})
ee.on('emit', function secondListener(arg1, arg2){
  console.log('second listener >>> ', arg1, arg2)
})
ee.on('emit', function(...args){
  console.log('third listener >>> ',  args, " >>> ", args.join('/'))
})
console.log(ee.listeners('emit'));

ee.emit('emit', 1, 2, 3, 5, 7, 9)


// emitter.eventNames()

// Returns an array listing the events for which the emitter has registered listeners. 

ee.on('dontEmit', ()=>console.log('dont Emit'))

console.log("All events >>> ", ee.eventNames());

ee.emit('dontEmit')
ee.emit('nothing')

// emitter.getMaxListeners()
// emitter.listenerCount(eventName[, listener])
// emitter.listeners(eventName)

// emitter.off(eventName, listener)
// emitter.on(eventName, listener)
// Adds the listener function to the end of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.
ee.on('do', function(){
  console.log('this is console output, from listener.')
  return 'do it'})
ee.on('do', function(){
  console.log('this is console output, from listener.')
  return 'do it'})
ee.on('do', function(){
  console.log('this is console output, from listener.')
  return 'do it'})

console.log(ee.listeners('do').forEach(f=>{console.log("this comes from forEach >>> ", f())}))
ee.emit('do')

// emitter.once(eventName, listener)

// emitter.prependListener()
// emitter.prependOnceListener()
ee.prependListener('do', function(){
  console.log('this is console output, from listener prepended.')
  return 'do it prepend'})
ee.prependListener('do', function(){
  console.log('this is console output, from listener prepended again.')
  return 'do it prepend second time'})

  // emitter.removeAllListeners([eventName])
  // emitter.removeListener(eventName, listener)
  // Once an event is emitted, all listeners attached to it at the time of emitting are called in order. This implies that any removeListener() or removeAllListeners() calls after emitting and before the last listener finishes execution will not remove them from emit() in progress. Subsequent events behave as expected.
  const callbackA = () => {
    console.log('A');
    ee.removeListener('removeTest', callbackB);
  };
  
  const callbackB = () => {
    console.log('B');
  };
  
  ee.on('removeTest', callbackA);
  
  ee.on('removeTest', callbackB);
  
  // callbackA removes listener callbackB but it will still be called.
  // Internal listener array at time of emit [callbackA, callbackB]
  ee.emit('removeTest');
  // Prints:
  //   A
  //   B
  
  // callbackB is now removed.
  // Internal listener array [callbackA]
  ee.emit('removeTest');
  // Prints:
  //   A

  // When a single function has been added as a handler multiple times for a single event (as in the example below), removeListener() will remove the most recently added instance. In the example the once('ping') listener is removed:

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');

// emitter.setMaxListeners(n)
