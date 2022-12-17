const path = require('path');

let baseName = path.basename('./data/sample.js');
let dirName = path.dirname('./data/sample.js');
let extName = path.extname('./data/sample.js');
let format = path.format({
  root: '',
  dir: './data',
  base: 'sample.js',
  ext: '.js',
  name: 'sample'
});
let isAbsolute = path.isAbsolute('/data/sample.js');
let join = path.join('/data', 'sample.js');
let normalize = path.normalize('////data///sample.js');
let parse = path.parse('/data/sample.js');
// let posix = path.posix;
let relative = path.relative('.data/sample.txt','pathModule.js');
let resolve = path.resolve('__dirname','..', 'data', 'sample.txt');
let toNamespacedPath = path.toNamespacedPath('data/sample.txt');

let output = {baseName, dirName, extName, format, isAbsolute, parse, join, normalize, relative, resolve, toNamespacedPath};
// , posix

console.log(output);

//in path module the most important methods are: join, resolve, relative, parse, normalize, format,
//some less important but useful methods are: basename, dirname, extname