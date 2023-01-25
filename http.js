// source: https://www.geeksforgeeks.org/node-js-agent-maxsockets-method/

/*
To make HTTP requests in Node.js, there is a built-in module HTTP in Node.js to transfer data over the HTTP. To use the HTTP server in node, we need to require the HTTP module. The HTTP module creates an HTTP server that listens to server ports and gives a response back to the client.
*/
let http = require('http');

//We can create a HTTP server with the help of http.createServer() method.
http.createServer((request, response)=>{
   
  // Sends a chunk of the response body
  response.write('Hello World!');
 
  // Signals the server that all of
  // the response headers and body 
  // have been sent
response.end();
})
.listen(3000); // Server listening on port 3000

// To make requests via the HTTP module http.request() method is used.
var options = {
  host: 'www.geeksforgeeks.org',
  path: '/courses',
  method: 'GET'
};
// Making a get request to 
// 'www.geeksforgeeks.org'
http.request(options, (response) => {
  
  // Printing the statusCode
  console.log(`STATUS: ${response.statusCode}`);
}).end();

/*
Node.js new Agent() Method:
The Node.js HTTP API is low-level so that it could support the HTTP applications. In order to access and use the HTTP server and client, we need to call them (by ‘require(‘http’)‘). HTTP message headers are represented as JSON Format.

The new Agent({}) (Added in v0.3.4) method is an inbuilt application programming interface (API) of the ‘http’ module in which default globalAgent is used by http.request() which should create a custom http.Agent instance
Syntax:

new Agent({options})
Parameters: This function accepts a single object parameter as mentioned above and described below:

options <Object> 
It is the configurable options that could be set on the agent.

keepAlive <boolean>: 
The Default value set is false. It still Keeps the sockets around whether there are outstanding requests or not, so it could be used for future requests without re-establishing the connection (TCP). The keep-alive header connection is sent while using an agent, and a ‘close’ connection is used to close the connection.

keepAliveMsecs <number>: 
The Default value set is false. It denotes the initial delay for TCP Keep-Alive packets and if the keepAlive option is false or undefined, gets ignored.

maxSockets <number>: 
The Default value set is Infinity. It allows the maximum number of sockets per host and until the maximum is reached, each request uses a new socket.

maxTotalSockets <number>: 
The Default value set is Infinity. It allows the maximum number of sockets for all hosts in total and until the maximum is reached, each request uses a new socket.

maxFreeSockets <number>: 
The Default value set is 256. In order to leave open in a free state, it uses the maximum number of sockets and it is relevant only if keepAlive is set to true.

scheduling <string>: 
The Default scheduling is FIFO. It is a strategy of picking the next free socket to schedule and use. It is of two type ‘FIFO‘ or ‘LIFO‘. ‘LIFO‘ (Last In First Out) selects the socket which is most recently used, while ‘FIFO’ (First In First Out) selects the socket which is least recently used.

timeout <number>: 
It counts the socket timeout in milliseconds and sets the timeout when the socket is created.

The below examples illustrate the use of new Agent({}) method in Node.js.
*/
// Example 1: Filename: index.js
// Node.js program to demonstrate the 
// new agent({}) method 
  
// Importing http module
// const http = require('http');
var agent = new http.Agent({});
  
// Creating new agent
const aliveAgent = new http.Agent({ keepAlive: true, 
maxSockets: 0, maxSockets: 5,  });
  
// Creating new agent
var agent = new http.Agent({});
  
// Creating new connection
var createConnection = aliveAgent.createConnection;
  
// Creating new connection
var createConnection = agent.createConnection;
console.log('Connection successfully created...');
  
// Printing the connection
console.log(createConnection);
console.log('Connection successfully created...');
  
// Printing the connection
console.log('Connection: ', createConnection);

/*
Another Module agentkeepalive fits better compatible with Http, which makes it easier to handle requests. In order to use the ‘agentkeepalive’ module, we need to install the NPM (Node Package Manager) and the following (on cmd).

// Creates package.json file
>> npm init 

// Installs express module
>> npm install agentkeepalive --save   OR
>> npm i agentkeepalive -s 

Import agentkeepalive module: Import agentkeepalive module and store returned instance into a variable.

*/

// Example 2: Filename: index.js
const Agent = require('agentkeepalive');

// Node.js program to demonstrate the 
// new agent({}) method 
  
// Importing http module
const http = require('http');
// Importing agentkeepalive module
const Agent = require('agentkeepalive');
// Creating new agent
const keepAliveAgent = new Agent({});
  
// Options object
const options = {
  host: 'geeksforgeeks.org',
  port: 80,
  path: '/',
  method: 'GET',
  agent: keepAliveAgent,
};
  
// Requesting via http server module
const req = http.request(options, (res) => {
  // console.log(require('util').inspect(res, depth=0));
  // Printing statuscode
  console.log("StatusCode: ", res.statusCode);
  // Printing headers
  console.log("Headers: ", res.headers);
});
  
// Printing agent options
console.log("Agent Options: ", req.agent.options);
// console.log(req.agent.sockets);
req.end();





















/****************************************************
 >>>HTTP protocol and Web Sockets Protocol<<<

 HTTP and WebSocket both are communication protocols used in client-server communication.

 >>>>HTTP protocol: 
 HTTP is unidirectional where the client sends the request and the server sends the response. Let’s take an example when a user sends a request to the server this request goes in the form of HTTP or HTTPS, after receiving a request server send the response to the client, each request is associated with a corresponding response, after sending the response the connection gets closed, each HTTP or HTTPS request establish the new connection to the server every time and after getting the response the connection gets terminated by itself. 
HTTP is a stateless protocol that runs on top of TCP which is a connection-oriented protocol it guarantees the delivery of data packet transfer using the three-way handshaking methods and re-transmits the lost packets. 

HTTP can run on top of any reliable connection-oriented protocol such as TCP, SCTP. When a client sends an HTTP request to the server, a TCP connection is open between the client and server and after getting the response the TCP connection gets terminated, each HTTP request opens a separate TCP connection to the server, for e.g. if the client sends 10 requests to the server the 10 separate TCP connection will be opened. and get closed after getting the response/fallback. 

HTTP message information encoded in ASCII, each HTTP request message composed HTTP protocol version(HTTP/1.1, HTTP/2), HTTP methods (GET/POST, etc.), HTTP headers (content type, content length), host information, etc. and the body which contain the actual message which is being transferred to the server. HTTP headers varied from 200 bytes to 2 KB in size, the common size of HTTP header is 700-800 bytes. When a web application uses more cookies and other tools at the client-side that expand storage features of the agent it reduces the HTTP header payload. 
 
>>>>WebSocket: 
WebSocket is bidirectional, a full-duplex protocol that is used in the same scenario of client-server communication, unlike HTTP it starts from ws:// or wss://. It is a stateful protocol, which means the connection between client and server will keep alive until it is terminated by either party (client or server). After closing the connection by either of the client and server, the connection is terminated from both ends. 

Let’s take an example of client-server communication, there is the client which is a web browser and a server, whenever we initiate the connection between client and server, the client-server made the handshaking and decide to create a new connection and this connection will keep alive until terminated by any of them. When the connection is established and alive the communication takes place using the same connection channel until it is terminated. 

This is how after client-server handshaking, the client-server decide on a new connection to keep it alive, this new connection will be known as WebSocket. Once the communication link establishment and the connection are opened, message exchange will take place in bidirectional mode until connection persists between client-server. If anyone of them (client-server) dies or decide to close the connection is closed by both of the party. The way in which socket works is slightly different from how HTTP works, the status code 101 denotes the switching protocol in WebSocket.

When can a web socket be used: 
 

Real-time web application: Real-time web application uses a web socket to show the data at the client end, which is continuously being sent by the backend server. In WebSocket, data is continuously pushed/transmitted into the same connection which is already open, that is why WebSocket is faster and improves the application performance. 
For e.g. in a trading website or bitcoin trading, for displaying the price fluctuation and movement data is continuously pushed by the backend server to the client end by using a WebSocket channel.
 
Gaming application: In a Gaming application, you might focus on that, data is continuously received by the server, and without refreshing the UI, it will take effect on the screen, UI gets automatically refreshed without even establishing the new connection, so it is very helpful in a Gaming application.
 
Chat application: Chat applications use WebSockets to establish the connection only once for exchange, publishing, and broadcasting the message among the subscribers. It reuses the same WebSocket connection, for sending and receiving the message and for one-to-one message transfer.
When not to use WebSocket: WebSocket can be used if we want any real-time updated or continuous streams of data that are being transmitted over the network. If we want to fetch old data, or want to get the data only once to process it with an application we should go with HTTP protocol, old data which is not required very frequently or fetched only once can be queried by the simple HTTP request, so in this scenario, it’s better not use WebSocket.

Note: RESTful web services are sufficient to get the data from the server if we are loading the data only once. 

Differences between HTTP and WebSocket Connection: 
Read here:
https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/


Note: Depending on your project you have to choose where it will be WebSocket or HTTP Connection.


*****************************************************/