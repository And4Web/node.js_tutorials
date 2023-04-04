const fs = require('fs');
const path = require('path');
var os = require('os');
const stream = require('stream');
const {EventEmitter} = require('events');

const myEvent = new EventEmitter();
// console.log(myEvent)

myEvent.on('event', ()=>{
  console.log("event listened as event has emitted.")
})
myEvent.on("event", ()=>{
  console.log('this is the second user')
})

myEvent.emit("event", ()=>{
  console.log('event emitted.')
})