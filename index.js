const fs = require('fs');
const readline = require('readline');
const path = require('path');
const url = require('url');

const myUrl = 'https://geeksforgeeks.org/p/a/t/h?query=string&name=anand&age=31&profession=developer#hash'

paramObj = {
  user : 'anand',
  password: '12345',
  role: 'developer',
  skills: ['javascript', 'python', 'react', 'node.js', 'django', 'mongodb', 'mysql'],
  isActive: true
}

let params = new URLSearchParams(paramObj)
let params2 = new URLSearchParams(myUrl);
let paramsObj = {
  name: params2.get('name'),
  age: params2.get('age'),
  profession: params2.get('profession')
}
// console.log("https://geeksforgeeks.org/p/a/t/h?query=string&" + params.toString());
// console.log(params.toString())
// console.log(">>>Params2:", paramsObj);
const map = new Map();
map.set('West Bengal', 'Kolkata');
map.set('Karnataka', 'Bengaluru');
params = new URLSearchParams(map);
params.set("Jammu", "Kashmir")
console.log("https://geeksforgeeks.org/p/a/t/h?query=string&" + params.toString());