const fs = require('fs');
const path = require('path');
var os = require('os');
const stream = require('stream');
const {EventEmitter} = require('events');

const myEvent = new EventEmitter();

myEvent.on('event', function(a, b) {
  console.log(a, b, this, this === myEvent);
  // Prints:
  //   a b MyEmitter {
  //     _events: [Object: null prototype] { event: [Function (anonymous)] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined,
  //     [Symbol(kCapture)]: false
  //   } true
});
myEvent.emit('event', 'a', 'b');