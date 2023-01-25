let http = require('http');

var options = {
  host: 'www.geeksforgeeks.org',
  path: '/courses',
  method: 'GET'
};

http.createServer((req, res)=>{
  // console.log(">>>>REQUEST>>>>", req)
  res.write('Hello World!');
  res.end();
}).listen(3000, ()=>console.log("Server running at Port: 3000"));
