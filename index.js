const fs = require('fs');
const path = require('path');
var os = require('os');
const stream = require('stream');
const {EventEmitter, errorMonitor} = require('events');

// Capture rejections of promises
const ee = new EventEmitter();
ee.on('something', function(err, value){
 try{ 
  if(err){
    throw new Error(err)
  } else{
    console.log(`something done! value >>> ${value} `)   
  }
}catch(err){
  console.log(err.message)
}
})


ee.emit('something', null, "the value is great!");
