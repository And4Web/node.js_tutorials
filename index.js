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
console.log(params.toString());
// console.log(params.toString())