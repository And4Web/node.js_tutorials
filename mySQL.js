//source: https://www.tutorialkart.com/nodejs/nodejs-mysql/

/*
Install MySQL in Node.js:

$ npm install mysql

After successful install,:
*/
var mysql = require('mysql');

/**
 Create Connection to MySQL Database:

 To create a connection variable with IP Address (of server where MySQL server is running), User Name and Password (of user that has access the MySQL database). An example is provided below :
 */
 var con = mysql.createConnection({
  host: "localhost",    // ip address of server running mysql
  user: "root",    // user name to your mysql database
  password: "password",    // corresponding password
  database: "studentsDB"  // use this database to querying context
});
/*
You may change the host as per your requirements. It could be an IP, or a URL, etc.

Make a call to connect function using connection variable, that we created in the previous step:

*/
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

/*
Function provided as argument to connect is a callback function. After node.js has tried with connecting to MySQL Database, the callback function is called with the resulting information sent as argument to the callback function.
*/

/*
SELECT FROM Query

We can connect to and access rows of a MySQL Table from Node.js program. MySQL SELECT Query is used to get one or more rows from MySQL Table.

MySQL SELECT Query is used to select some of the records (with some of their properties if required) of a table.

We shall use the following MySQL Table, in the following examples.

DATABASE : studentsDB

Table: studends

mysql> select * from students;
+----------+--------+-------+
| name     | rollno | marks |
+----------+--------+-------+
| John     |      1 |    74 |
| Arjun    |      2 |    74 |
| Prasanth |      3 |    77 |
| Adarsh   |      4 |    78 |
| Raja     |      5 |    94 |
| Sai      |      6 |    84 |
| Ross     |      7 |    54 |
| Monica   |      8 |    86 |
| Lee      |      9 |    98 |
| Bruce    |     10 |    92 |
| Sukumar  |     11 |    99 |
+----------+--------+-------+
11 rows in set (0.01 sec)


Example 1 – MySQL SELECT FROM Query via Node.js
*/
con.query("SELECT * FROM students", function (err, result, fields) {
  // if any error while executing above query, throw error
  if (err) throw err;
  // if there is no error, you have the result
  console.log(result);
});

/*
Example 2 – Select only Specific Columns of MySQL Table via Node.js
*/
con.query("SELECT name,marks FROM students", function (err, result, fields) {
  // if any error while executing above query, throw error
  if (err) throw err;
  // if there is no error, you have the result
  console.log(result);
});

/*
Example 3 – Access Result Object of MySQL SELECT FROM Query via Node.js

we will access rows from Result Object using index, columns and DOT operator.
*/
con.query("SELECT * FROM students", function (err, result, fields) {
  // if any error while executing above query, throw error
  if (err) throw err;
  // if there is no error, you have the result
  // iterate for all the rows in result
  Object.keys(result).forEach(function(key) {
    var row = result[key];
    console.log(row.name)
  });
});

/*
Example 4 – Fields Object of MySQL SELECT FROM Query via Node.js

Fields contain information about columns of table. Each field contains all information about a column. You may use the elements of a field object using dot operator. Example field.catalog, field.name, field.type, etc.
*/
con.query("SELECT * FROM students", function (err, result, fields) {
  // if any error while executing above query, throw error
  if (err) throw err;
  // if there is no error, you have the fields object
  // iterate for all the rows in fields object
  Object.keys(fields).forEach(function(key) {
    var field = fields[key];
    console.log(field)
  });
});

/*
Node.js – MySQL WHERE

used to filter the selection of MySQL SELECT FROM statement records based on a condition applied to one or more columns of the TABLE.

We shall learn to filter records of a table using following Node.js examples

We shall use the following MySQL Table, in the examples of this section [DATABASE : studentsDB, Table: students]

mysql> select * from students;
+---------------+--------+-------+
| name          | rollno | marks |
+---------------+--------+-------+
| John          |      1 |    74 |
| Arjun         |      2 |    74 |
| Prasanth      |      3 |    77 |
| Adarsh        |      4 |    78 |
| Raja          |      5 |    94 |
| Sai           |      6 |    84 |
| Ross          |      7 |    54 |
| Monica Gellar |      8 |    86 |
| Lee           |      9 |    98 |
| Bruce Wane    |     10 |    92 |
| Sukumar       |     11 |    99 |
+---------------+--------+-------+
11 rows in set (0.00 sec)
*/
/*
Example 1 – Node.js MySQL WHERE with filter applied on a column
We shall apply a filter based on marks and fetch only those records with marks greater than 90.
*/
var con = mysql.createConnection({
  host: "localhost",    // ip address of server running mysql
  user: "arjun",    // user name to your mysql database
  password: "password", // corresponding password
  database: "studentsDB" // use the specified database
});
 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("SELECT * FROM students where marks>90", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});

/*
Example 2 – Node.js MySQL WHERE to use Escaping Query Values
Records may contain data with escaping values like space characters. Following Node.js MySQL example program helps you to filter records based on values containing escaping characters.
*/
var name = "Bruce Wane";
  var query = "SELECT * FROM students where name=" + mysql.escape(name);
  con.query(query, function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });

  /*
  Example 3 – Node.js MySQL WHERE with filter applied on two columns
We shall apply a filter based on marks and fetch only those records with marks greater than 90 and rollno less than 8.
  */
con.query("SELECT * FROM students where marks>90 && rollno<8", function (err, result, fields) {
  // if any error while executing above query, throw error
  if (err) throw err;
  // if there is no error, you have the result
  console.log(result);
});

/*
Node.js MySQL ORDER BY

Node.js MySQL ORDER BY is used to in conjunction with SELECT FROM Query to sort the records in ascending or descending order with respect to a column.

By default, Node.js MySQL ORDER BY results in an ascending order of elements, or you may also use ASC keyword. For descending order of records, DESC keyword should be used.

Example 1 – ORDER Rows from MySQL Table in Ascending Order – Node.js
In this example, we will get rows from MySQL table sorted in ascending order.
*/
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("SELECT * FROM students ORDER BY marks", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});

/*
Example 2 – ORDER Rows from MySQL Table in Ascending Order
In this example, we will sort rows based on a column of type TEXT.
The records are sorted in ascending order with respect to name column.
*/
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("SELECT * FROM students ORDER BY name", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});

/*
Example 3 – ORDER Rows in Descending Order
In this example, we will sort rows in descending order of a specific column “name”.
*/
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("SELECT * FROM students ORDER BY name DESC", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});

/*
Node.js MySQL INSERT INTO Query Examples

used to insert one or more records into MySQL Table.

Example 1 – INSERT Row into MySQL Table via Node.js
In this example, we will connect to MySQL database, and insert a record into students table.
*/

con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("INSERT INTO students (name,rollno,marks) values ('Anisha',12,95)", function (err, result, fields) {
	// if any error while executing above query, throw error
    if (err) throw err;
	// if there is no error, you have the result
    console.log(result);
  });
});

/*
Example 2 – INSERT Multiple Rows into MySQL Table via Node.js
In this example, we will connect to MySQL database, and insert three records into students table in a single statement.
*/
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  var records = [
    ['Miley', 13, 85],
    ['Jobin', 14, 87],
    ['Amy', 15, 74]
  ];
  con.query("INSERT INTO students (name,rollno,marks) VALUES ?", [records], function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});

/*
Accessing properties of Result Object
Once the INSERT INTO Query is executed, MySQL Server responds with a result object. The properties of result object like affectedRows, serverStatus, changedRows etc., could be accessed using DOT (.) operator.
*/

con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  var records = [
    ['Jack', 16, 82],
    ['Priya', 17, 88],
    ['Amy', 15, 74]
  ];
  con.query("INSERT INTO students (name,rollno,marks) VALUES ?", [records], function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
    console.log("Number of rows affected : " + result.affectedRows);
    console.log("Number of records affected with warning : " + result.warningCount);
    console.log("Message from MySQL Server : " + result.message);
  });
});

/*
Node.js MySQL – UPDATE Table Query – Examples

We can update records of a table using MySQL UPDATE Query.

Example 1 – Update Row(s) of MySQL Table via Node.js
Consider the case that due to manual error, records in the students table are inserted with marks as 74 instead of 84. Now we shall execute a MySQL Update Query that updates marks column with value 84 where there is a value of 74.
*/
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("UPDATE students SET marks=84 WHERE marks=74", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});

/*
Example 2 – Update All Records of MySQL Table via Node.js
Consider a scenario where the exam conducted to the students is cancelled due to some reason, you want to reconduct the exam. So, you would like to update the marks for all the students to 0. Following Node.js MySQL UPDATE Query Example shows how to update all the records of a table.
*/
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("UPDATE students SET marks=84", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});

/*
Observe that there is no WHERE clause in the Query because of which all the records are selected for update process.
*/

/*
Node.js MySQL DELETE Records FROM Table

Delete Query helps you to delete one or more records from a table based on a filtering condition.

Example 1 – Delete Rows from MySQL Table using Node.js
In this example, we will take a MySQL table, and delete the rows from it which satisfy given condition.

To delete rows that obey a given condition, execute DELETE FROM query on specified table with filter applied on one or many properties of records in the table.

MySQL Table – students

mysql> select * from students;
+---------------+--------+-------+
| name          | rollno | marks |
+---------------+--------+-------+
| John          |      1 |    74 |
| Arjun         |      2 |    74 |
| Prasanth      |      3 |    77 |
| Adarsh        |      4 |    78 |
| Raja          |      5 |    94 |
| Sai           |      6 |    84 |
| Ross          |      7 |    54 |
| Monica Gellar |      8 |    86 |
| Lee           |      9 |    98 |
| Bruce Wane    |     10 |    92 |
| Sukumar       |     11 |    99 |
| Anisha        |     12 |    95 |
| Miley         |     13 |    85 |
| Jobin         |     14 |    87 |
| Jack          |     16 |    82 |
| Priya         |     17 |    88 |
+---------------+--------+-------+
16 rows in set (0.00 sec)
*/
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("DELETE FROM students WHERE rollno>10", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});

/*
Observe that in the result, affectedRows is 6, which means six records have been deleted.

Following are the records left after executing MySQL DELETE FROM query on students table.

mysql> select * from students;
+---------------+--------+-------+
| name          | rollno | marks |
+---------------+--------+-------+
| John          |      1 |    74 |
| Arjun         |      2 |    74 |
| Prasanth      |      3 |    77 |
| Adarsh        |      4 |    78 |
| Raja          |      5 |    94 |
| Sai           |      6 |    84 |
| Ross          |      7 |    54 |
| Monica Gellar |      8 |    86 |
| Lee           |      9 |    98 |
| Bruce Wane    |     10 |    92 |
+---------------+--------+-------+
10 rows in set (0.00 sec)
*/

/*
Example 2 – Delete All Records from MySQL Table via Node.js
In this example, we will take a MySQL table, and delete all of its rows.

To delete all the rows, execute DELETE FROM query on specified table.
*/
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("DELETE FROM students", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});

/*
Following are the contents of students table after execution

mysql> select * from students;
Empty set (0.00 sec)
*/

/*
Node.js MySQL Result Object – Examples

Result objects returned by different SQL queries and how to access their properties using DOT operator.

The contents of Result Object depends on the SQL query made to MySQL Server. Following table contents describe the result object for queries like select, insert, update and delete.

We shall see how to access properties of records in a result set and how to access properties of execution status with the help of following examples.

Example 1 – MySQL SELECT FROM Query – Accessing ResultSet
We can access the records in Result Set as an array and properties of a record using DOT (.) Operator.

In this example, we will execute “SELECT FROM” SQL query, and we access the rows and column values using DOT operator.
*/
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("SELECT * FROM students", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    // iterate for all the rows in result
    Object.keys(result).forEach(function(key) {
      var row = result[key];
      console.log(row.name)
    });
  });
});

/*
Example 2 – Result Object of MySQL INSERT INTO Query
In this example, we will execute “INSERT INTO” SQL query. query() method returns an object with properties specifying the result of this insert operations. The result object contains fields like fieldCount, affectedRows, insertId, etc. We will access these fields using DOT operator on the result object.
*/
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  var records = [
    ['Jack', 16, 82],
    ['Priya', 17, 88],
    ['Amy', 15, 74]
  ];
  con.query("INSERT INTO students (name,rollno,marks) VALUES ?", [records], function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
    console.log("Number of rows affected : " + result.affectedRows);
    console.log("Number of records affected with warning : " + result.warningCount);
    console.log("Message from MySQL Server : " + result.message);
  });
});

/*
Example 3 – Result Object of MySQL UPDATE Query
In this example, we will execute DELETE query on MySQL Table. query() function returns Result object with properties like fieldCount, affectedRows, warningCount, message, etc.

We will these access properties of result object using DOT Operator.
*/
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("UPDATE students SET marks=84 WHERE marks=74", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
    console.log("Number of rows affected : " + result.affectedRows);
    console.log("Number of records affected with warning : " + result.warningCount);
    console.log("Message from MySQL Server : " + result.message);
  });
});

/*
Example 4 – Result Object of MySQL DELETE FROM Query
In this example, we will execute DELETE query on MySQL Table. query() function returns Result object with properties like fieldCount, affectedRows, warningCount, message, etc.

We will these access properties of result object using DOT Operator.
*/
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("DELETE FROM students WHERE rollno>10", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
    console.log("Number of rows affected : " + result.affectedRows);
    console.log("Number of records affected with warning : " + result.warningCount);
    console.log("Message from MySQL Server : " + result.message);
  });
});

/*

*/