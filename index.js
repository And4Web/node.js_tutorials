const fs = require('fs');
const path = require('path');
var os = require('os');
const stream = require('stream');
const {EventEmitter, errorMonitor} = require('events');

const ee = new EventEmitter();


