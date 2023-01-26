//source: https://www.tutorialkart.com/nodejs/node-js-mongodb/

/*
Prerequisites to work with MongoDB from Node.js

1. Make Sure MongoDB is installed. If not Install MongoDB.

2. Install “mongodb” package using npm (if not installed already).
*/
/*
Node.js – Connect to MongoDB – Example

Step 1: Start MongoDB service.

Run the following command to start MongoDB Service.

sudo service mongod start

Step 2: Install mongodb package using npm (if not installed already).

Step 3: Prepare the url.

A simple hack to know the base url of MongoDB Service is to Open a Terminal and run Mongo Shell

While the Mongo Shell starts up, it echoes back the base url of MongoDB.

mongodb://127.0.0.1:27017

Step 4: With the help of mongodb package, create a MongoClient and connect to the url.

Example 1 – Connect to MongoDB via Node.js
Following is an Example Node.js program to make a Node.js MongoDB Connection.
*/
// URL at which MongoDB service is running
var url = "mongodb://localhost:27017";
 
// A Client to MongoDB
var MongoClient = require('mongodb').MongoClient;
 
// Make a connection to MongoDB Service
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Connected to MongoDB!");
  db.close();
});

/*
Node.js – Create Database in MongoDB

Step 5: Create a MongoClient.

var MongoClient = require('mongodb').MongoClient;

Step 6: Make connection from MongoClient to the MongoDB Server with the help of URL.

Note: In MongoDB, creating Database is an implicit process.

MongoClient.connect(url, <callback_function>);

Once the MongoClient is done trying to make a connection, the callback function receives error and db object as arguments.

If the connection is successful, the db object points to the newly created database newdb.

Example 1 – Create MongoDB Database from Node.js
In this example, we will create a new database named newdb from Node.js program.
*/
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  // print database name
  console.log("db object points to the database : "+ db.databaseName);
  // after completing all the operations with db, close it.
  db.close();
});

/*
Node.js – Drop Database in MongoDB

We can delete/drop a database from MongoDB through Node.js program.

Step 6: Delete the Database using dropDatabase(callback) method.

db.dropDatabase(<callback_function>);
Step 7: Close the connection to database.

Once all the operations are done, close the db object.

Note: In case of nested callback functions, which is the case in the below example, close the connection to database in the innermost callback function (or which gets executed last) to ensure that all the db operations are completed before closing connection.

db.close();

Example 1 – Drop Database from MongoDB via Node.js
In this example, we will drop a database named newdb.
*/

// make client connect to mongo service
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Connected to Database!");
  // print database name
  console.log("db object points to the database : "+ db.databaseName);
  // delete the database
  db.dropDatabase(function(err, result){
      console.log("Error : "+err);
      if (err) throw err;
      console.log("Operation Success ? "+result);
      // after all the operations with db, close it.
      db.close();
  });
});

/*
Node.js – Create Collection in MongoDB – Example

Step 8: Create a MongoDB Collection in the database.

Following is the syntax of createCollection() method used to create collection in MongoDB from Node.js.

db.createCollection(<collection_name>, <callback_function>)

collection_name: Name of the new MongoDB Collection, that we would like to create
callback_function: This Node.js Callback Function is called after Node has tried creating a collection, and ready with the result. The callback function receives error and result object as arguments.

Example 1 – Create Collection in MongoDB via Node.js
In this example, we will connect to a MongoDB Database and create a collection named “users”.
*/
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // db pointing to newdb
  console.log("Switched to "+db.databaseName+" database");
  // create 'users' collection in newdb database
  db.createCollection("users", function(err, result) {
      if (err) throw err;
      console.log("Collection is created!");
      // close the connection to db when you are done with it
      db.close();
  });
});

/*
Node.js – Delete Collection in MongoDB

Step 9: Delete MongoDB Collection.

Following is the syntax of remove() method used to delete collection in MongoDB from Node.js.

collection.remove({},callback_function)

collection: reference to the mongodb collection that we would like to delete

callback_function: This Node.js Callback Function is called after Node has tried deleting the specified collection, and ready with the result. The callback function receives error and result object as arguments.

Example 1 – Delete Collection in MongoDB using Node.js
In this example, we will delete a MongoDB Collection using remove() method.
*/

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // db pointing to newdb
  console.log("Switched to "+db.databaseName+" database");
  // get reference to collection
  db.collection("users", function(err, collection) {
      // handle the error if any
      if (err) throw err;
      // delete the mongodb collection
      collection.remove({}, function(err, result){
          // handle the error if any
          if (err) throw err;
          console.log("Collection is deleted! "+result);
          // close the connection to db when you are done with it
          db.close();
      });
  });
});

/*
Node.js – Insert Document(s) to MongoDB Collection – Examples

to insert one or more documents to MongoDB Collection from Node.js Application, using insertOne() and insertMany() method respectively, with examples.

Step 10: Insert documents to specified MongoDB Collection.

Following is the syntax of insertOne() and insertMay() methods used to insert documents to collection in MongoDB from Node.js.

insertOne()

db.collection(<collection_name>).insertOne(<document>, <callback_function>)
insertMany()

db.collection(<collection_name>).insertMany(<documents_array>, <callback_function>)

<collection_name>: Name of the new MongoDB Collection, that we would like to create
<document>: Single document that has to be inserted to MongoDB Collection
<document_array>: Array of documents to be inserted to MongoDB Collection
<callback_function>: This Node.js Callback Function is called after Node has tried creating a collection, and ready with the result. The callback function receives error and result object as arguments.

Example 1 – insertOne() – Insert Document via Node.js
In this example, we will use insertOne() method and insert a document to MongoDB Collection via Node.js program.
*/
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // db pointing to newdb
  console.log("Switched to "+db.databaseName+" database");

  // document to be inserted
  var doc = { name: "Roshan", age: "22" };
   
  // insert document to 'users' collection using insertOne
  db.collection("users").insertOne(doc, function(err, res) {
      if (err) throw err;
      console.log("Document inserted");
      // close the connection to db when you are done with it
      db.close();
  });
});

/*
Example 2 – insertMany() – Insert Many Documents via Node.js
In this example, we will use insertMany() method and insert multiple documents to MongoDB Collection via Node.js program.
*/

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // db pointing to newdb
  console.log("Switched to "+db.databaseName+" database");

  // documents to be inserted
  var docs = [{ name: "Udat", age: "21" },
              { name: "Karthik", age: "24" },
              { name: "Anil", age: "23" }];
   
  // insert multiple documents to 'users' collection using insertOne
  db.collection("users").insertMany(docs, function(err, res) {
      if (err) throw err;
      console.log(res.insertedCount+" documents inserted");
      // close the connection to db when you are done with it
      db.close();
  });
});

/*
Fix Node.js MongoError: failed to connect to server

to fix MongoError: failed to connect to server by investigating into the scenarios that could trigger this error.

To fix Node.js MongoError: failed to connect to server, follow the two checkpoints

1. Make sure MongoDB Service is up and running.
2. The URL you provide to the MongoClient.connect() method should be correct.

How to Verify if MongoDB Service is up and running
Starting the Mongo Shell should verify this.

If your MongoDB Service is not up, you would get an Error in the Terminal as below.

arjun@tutorialkart:~/workspace/nodejs/mongodb$ mongo
MongoDB shell version v3.4.9
connecting to: mongodb://127.0.0.1:27017
2017-10-30T14:32:21.476+0530 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27017, in(checking socket for error after poll), reason: Connection refused
2017-10-30T14:32:21.477+0530 E QUERY    [thread1] Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed :
connect@src/mongo/shell/mongo.js:237:13
@(connect):1:6
exception: connect failed

How to make sure that the URL is correct?
When we start Mongo Shell, MongoDB logs the URL to Terminal, similar to something like below :

connecting to: mongodb://127.0.0.1:27017
mongodb://127.0.0.1:27017 is the base url.

Make sure that you are providing the same base URL (same IP and Port) in your Node.js Application.


*/
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Connected to MongoDB!");
  db.close();
});