//source: https://www.tutorialkart.com/nodejs/mongoose/

/*
Node.js Mongoose Tutorial

Node.js Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

With the help of Mongoose, we can model our data.

For example consider that we are operating a store. Store has items. Each item could have properties : name, id, price, discount price, etc. With Mongoose we can model our items and do insertions or reads from the MongoDB Collection in terms of model objects, not bothering about the details of an object. Mongoose provides abstraction at Model level.
*/

/*
Node.js Mongoose – Installation

Prerequisites
It is assumed that you have already installed Node.js and MongoDB. 

Installation
To install Mongoose package, use npm (Node Package Manager). Open a terminal and run the following command.

$ npm install mongoose

Using Mongoose
To use Mongoose in Node.js Script File, include require statement with mongoose package.

*/
var mongoose = require('mongoose');

/*
Node.js Mongoose – Connect to MongoDB

To connect to MongoDB from Node.js using Mongoose package, call connect() function, on the variable referencing to mongoose, with MongoDB Database URI passed as argument to the function.
*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/database_name');
/*
Get reference to Database
To get a reference to the database specified, use connection() function on Mongoose reference, as shown below :
*/
var db = mongoose.connection;
/*
Is connection successful ?
To check if the connection is successful or not, you may use callback functions : on() and once().
*/
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});

/*
When the connection is made without any errors and is open, callback function provided to db.open(‘open’, callback) is executed.
*/

/*
Node.js Mongoose – Define a Model

To define a model, derive a custom schema from Mongoose’s Schema and compile the schema to a model.

How to recognize a Model
Let us consider that we are operating a bookstore and we need to develop a Node.js Application for maintaining the book store. Also we chose MongoDB as the database for storing data regarding books. The simplest item of transaction here is a book. Hence, we shall define a model called Book and transact objects of Book Model between Node.js and MongoDB. Mongoose helps us to abstract at Book level, during transactions with the database.

Derive a custom schema
Following is an example where we derive a custom Schema from Mongoose’s Schema.
*/
var BookSchema = mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

/*
Compile Schema to Model
Once we derive a custom schema, we could compile it to a model.

Following is an example where we define a model named Book with the help of BookSchema.

var Book = mongoose.model('Book', BookSchema, <collection_name>);

<collection_name> is the name of the collection you want the documents go to.
*/
/*
Initialize a Document
We may now use the model to initialize documents of the Model.

book1 is a Document of model Book.
*/
var book1 = new Book({ name: 'Introduction to Mongoose', price: 10, quantity: 25 });

/*
Node.js Mongoose – save() – Insert Document to MongoDB

Insert Document to MongoDB – To insert a single document to MongoDB, call save() method on document instance. Callback function(err, document) is an optional argument to save() method. Insertion happens asynchronously and any operations dependent on the inserted document has to happen in callback function for correctness.

Example 1 – Insert Document to MongoDB using Mongoose
Following example demonstrates saving document to collection.
*/

// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
     
    // define Schema
    var BookSchema = mongoose.Schema({
      name: String,
      price: Number,
      quantity: Number
    });
 
    // compile schema to model
    var Book = mongoose.model('Book', BookSchema, 'bookstore');
 
    // a document instance
    var book1 = new Book({ name: 'Introduction to Mongoose', price: 10, quantity: 25 });
 
    // save model to database
    book1.save(function (err, book) {
      if (err) return console.error(err);
      console.log(book.name + " saved to bookstore collection.");
    });
     
});

/*
Node.js Mongoose – Insert Multiple Documents to MongoDB

To insert Multiple Documents to MongoDB using Mongoose, use Model.collection.insert(docs_array, options, callback_function); method. Callback function has error and inserted_documents as arguments.

Syntax of insert() method
Model.collection.insert(docs, options, callback)
where

docs is the array of documents to be inserted;
options is an optional configuration object – see the docs
callback(err, docs) will be called after all documents get saved or an error occurs. On success, docs is the array of persisted documents.

Example – Insert Multiple Documents to MongoDB via Node.js
In this example, we will write a Node.js script that inserts Multiple Documents to MongoDB Collection 'bookstore' using Mongoose module.
*/
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
     
    // define Schema
    var BookSchema = mongoose.Schema({
      name: String,
      price: Number,
      quantity: Number
    });
 
    // compile schema to model
    var Book = mongoose.model('Book', BookSchema, 'bookstore');
 
    // documents array
    var books = [{ name: 'Mongoose Tutorial', price: 10, quantity: 25 },
                    { name: 'NodeJS tutorial', price: 15, quantity: 5 },
                    { name: 'MongoDB Tutorial', price: 20, quantity: 2 }];
 
    // save multiple documents to the collection referenced by Book Model
    Book.collection.insert(books, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
     
});

