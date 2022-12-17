const fs = require('fs');
const  {unlink} = require('fs/promises');
const path = require('path');

//all notes from nodejs.org and https://www.geeksforgeeks.org/node-js-file-system/?ref=lbp

//read file with encoding
fs.readFile('./data/sample.txt', {encoding: 'utf-8'}, (err, content)=>{  
  if(err) return console.log(`Error: "${err.message}", Error Code: '${err.code}'`);
  console.log(content);
});

//read file without encoding in binary and hexadecimal format
fs.readFile('./data/sample.txt',(err, content)=>{  
  if(err) return console.log(`Error: "${err.message}", Error Code: '${err.code}'`);
  console.log(content);
  console.log(content.toString('hex'));
});

//use relative path
fs.readFile(path.join(__dirname, 'data', 'sample.txt'), {encoding: 'utf-8'}, (err, content)=>{
  if(err) return console.log(`Error: "${err.message}", Error Code: '${err.code}'`);
  console.log(content);
})

//reading csv file
fs.readFile('./data/export_projects.csv', 'utf-8', (err, data)=>{
  if(err) return console.log(err.message);
  let dataArr = data.split(/\r?\n/);
  console.log(dataArr)
})
//using unlink from fs/promises or fs.unlink() to delete a file
(async(path)=>{
  try {
    await unlink(path);
    console.log(`successfully deleted: ${path}...`)     
  } catch (error) {
    console.log(`Error found: ${error.message}`)
  } 
})('./component/footer.js')

//unlink using callback

fs.unlink('./component/footer.js', (err)=>{
  if(err) console.log(`Error found: ${err.message}`);
  console.log(`successfully deleted: ...`)
})


//read files in a directory
fs.readdir('./data', (err, files)=>{
  if(err) return console.log(err.message);
  console.log(files)
})

//write to a file
fs.writeFile('./data/sample2.txt', 'hello world! this is too much.', (err)=>{
  if(err) return console.log(err.message);
  console.log('done writing!')
})

//changing content of a text file
fs.readFile('./data/sample2.txt', 'utf-8',(err, data)=>{
  if(err) return console.log(err.message);

  let newVal = data.replace('justtobossthala', 'hello');
  fs.writeFile('./data/sample2.txt', newVal, 'utf-8', (err, data)=>{
    if(err) return console.log(err.message);
    console.log('done!')
  })
})

//reading a file into a buffer using streams
let fileStream = fs.createReadStream('./data/sample.txt');
let chunks = [];
let fileBuffer;
fileStream.once('error', (err)=>{
  console.log(err.message);
})
fileStream.once('end', ()=>{
  fileBuffer = Buffer.concat(chunks);
})
fileStream.on('data', (chunk)=>{
  chunks.push(chunk);
})

//reading a file line by line
let file = './data/sample.txt';

let rl = readline.createInterface({
  input: fs.createReadStream(file),
  output: process.stdout,
  terminal: false
});
rl.on('line', (line)=>{
  console.log(line.content)
})

//determining the line count of a text file
let file2 = './data/sample2.txt';
let linesCount = 0;
let rl2 = readline.createInterface({
  input: fs.createReadStream(file2),
  output: process.stdout,
  terminal: false
});
rl2.on('line', (line)=>{
  linesCount++;
})
rl2.on('close', ()=>{
  console.log(linesCount);
})

//check if a file or directory exists or not
fs.stat('./data/sample4.txt', (err)=>{
  if(!err){
    console.log('file exists');
  } else if(err.code === 'ENOENT'){
    console.log('file or directory doesn\'t exist.')
  }
})

//copy files by piping streams
let readable = fs.createReadStream('./data/sample.txt', {encoding: 'utf-8'} );
let writable = fs.createWriteStream('./data/sample2.txt', {encoding: 'utf-8'} );

readable.pipe(writable);

fs.readFile('./data/sample2.txt', {encoding: 'utf-8'}, (err, content)=>{
  if(err) return err.message;
  console.log(content)
})

//Open a File: The fs.open() method is used to create, read, or write a file. The fs.readFile() method is only for reading the file and fs.writeFile() method is only for writing to the file, whereas fs.open() method does several operations on a file. First, we need to load the fs class which is a module to access the physical file system. 
// open a file: Syntax:
//fs.open(path, flags, mode, callback)
//Parameters:
// path: It holds the name of the file to read or the entire path if stored at other locations.
// flags: Flags indicate the behavior of the file to be opened. All possible values are ( r, r+, rs, rs+, w, wx, w+, wx+, a, ax, a+, ax+).
// mode: Sets the mode of file i.e. r-read, w-write, r+ -readwrite. It sets to default as readwrite. 
// err: If any error occurs.
// data: Contents of the file. It is called after the open operation is executed.

fs.open('./data/sample2.txt', 'r+', (err, data)=>{
  if(err) console.log(err.message);
  console.log("file open successfully...");
})

// Reading a File: The fs.read() method is used to read the file specified by fd. This method reads the entire file into the buffer. Syntax:
// fs.read(fd, buffer, offset, length, position, callback)
// Parameters:
// fd: This is the file descriptor returned by fs.open() method.
// buffer: This is the buffer that the data will be written to.
// offset: This is the offset in the buffer to start writing at.
// length: This is an integer specifying the number of bytes to read.
// position: This is an integer specifying where to begin reading from in the file. If the position is null, data will be read from the current file position.
// callback: It is a callback function that is called after reading of the file. It takes two parameters:
// err: If any error occurs.
// data: Contents of the file.
let buf = new Buffer(1024);

console.log("opening an existing file");
fs.open('./data/sample2.txt', 'r+', function(err, fd) {
   if (err) {
      return console.error(err);
   }
   console.log("File opened successfully!");
   console.log("reading the file");
    
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }
      console.log(bytes + " bytes read");
       
      // Print only read bytes to avoid junk.
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }
   });
});

//Appending to a File: The fs.appendFile() method is used to synchronously append the data to the file. Syntax:
// fs.appendFile(filepath, data, options, callback);
// or
// fs.appendFileSync(filepath, data, options);
// Parameters:
// filepath: It is a String that specifies the file path.
// data: It is mandatory and it contains the data that you append to the file.
// options: It is an optional parameter that specifies the encoding/mode/flag.
// Callback: Function is mandatory and is called when appending data to file is completed.
  
var data = "\nLearn Node.js";
  
// Append data to file
fs.appendFile('input.txt', data, 'utf8',
 
    // Callback function
    function(err) {
        if (err) throw err;
 
        //  If no error
        console.log("Data is appended to file successfully.")
});


// Closing the File: The fs.close() method is used to asynchronously close the given file descriptor thereby clearing the file that is associated with it. This will allow the file descriptor to be reused for other files. Calling fs.close() on a file descriptor while some other operation is being performed on it may lead to undefined behavior. Syntax:
// fs.close(fd, callback)
// Parameters:
// fd: It is an integer that denotes the file descriptor of the file for which to be closed.
// callback: It is a function that would be called when the method is executed.
// err: It is an error that would be thrown if the method fails.
// Close the opened file.

fs.close(fd, function(err) {
  if (err) {
     console.log(err);
  }
  console.log("File closed successfully.");
})

// Delete a File: The fs.unlink() method is used to remove a file or symbolic link from the filesystem. This function does not work on directories, therefore it is recommended to use fs.rmdir() to remove a directory. Syntax:

// fs.unlink(path, callback)
// Parameters:

// path: It is a string, Buffer or URL which represents the file or symbolic link which has to be removed.
// callback: It is a function that would be called when the method is executed.
// err: It is an error that would be thrown if the method fails.
 
console.log("deleting an existing file...");
fs.unlink('./data/sample3.txt', function(err) {
   if (err) {
      return console.error(err.message);
   }
   console.log("File deleted successfully!");
});

//The fs.exists() method is an inbuilt application programming interface of fs module which provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions. The fs.exists() method is used to test whether the given path exists or not in the file system. Syntax:

// fs.exists( path, callback )

// Parameters: This method accept two parameters as mentioned above and described below:

// path: The path at which directory is to be tested for existence. It can be string, buffer, etc.
// callback: It is a callback function passed to the exists() method.
// Return value: It returns boolean values which signifies that the path exists or not.
// Note: It is now deprecated.
fs.exists('/etc/passwd', (exists) => {
  console.log(exists ? 'Found' : 'Not Found!');
});

//The fs.mkdir() method i Node.js is used to create a directory asynchronously.
// Syntax
// fs.mkdir(path, mode, callback)
// Parameters: This method accept three parameters as mentioned above and described below:

// path: This parameter holds the path of the directory has to be created.
// mode: This parameter holds the recursive boolean value. The mode option is used to set the directory permission, by default it is 0777.
// callback: This parameter holds the callback function that contains error. The recursive option if set to true will not give an error message if the directory to be created already exists.
//Note: If you will run this program again, then it will display an error message as the directory already exists. To overcome this error we will use the recursive option.
   
fs.mkdir(path.join(__dirname, 'test'), {recursive: true}, (err) => {
  if (err) {
      return console.error(err);
  }
  console.log('Directory created successfully!');
});

//creating new file using writeFile()
let linksData = 'https://www.geeksforgeeks.org/node-js-fs-mkdir-method/\n\nhttps://www.tutorialkart.com/nodejs'

fs.writeFile('./test/links.txt', linksData, (err)=>{
  if(err) return console.log(err.message);
  console.log('new file created...')
})

//The fs.truncate() method in node.js is used to change the size of the file i.e either increase or decrease the file size. This method changes the length of the file at the path by len bytes. If len represents a length shorter than the file’s current length, the file is truncated to that length. If it is greater than the file length is padded by appending null bytes (x00) until len is reached.
//Syntax:
// fs.truncate( path, len, callback )
//Parameters: This method accept three parameters as mentioned above and described below:
// path: It holds the path of targeted file. It can be either string, buffer or a url.
// len: It holds the length of the file after which the file will be truncated. It takes an integer input and it is not the mandatory condition as it is default set to 0.
// callback: The callback receives one argument, any exception throws in the call.
//Note: In latest version of node.js, callback is no longer optional parameter. If we will not use the callback parameter then it will return “Type Error” on run-time.

// Completely delete the content
// of the targeted file
fs.truncate('/path/to/file', 0, function() {
    console.log('File Content Deleted')
});

//The fs.renameSync() method is used to synchronously rename a file at the given old path to the given new path. It will overwrite the destination file if it already exists.
//Syntax:
// fs.renameSync( oldPath, newPath )
// Property Values:
// oldPath: It holds the path of the file that has to be renamed. It can be a string, buffer or URL.
// newPath: It holds the new path that the file has to be renamed to. It can be a string, buffer or URL.
// List all the filenames before renaming
getCurrentFilenames();
  
// Rename the file
fs.renameSync('./data/ooyah.txt', './data/sample.txt');
  
// List all the filenames after renaming
getCurrentFilenames();
  
// function to get current filenames in directory
function getCurrentFilenames() {
  console.log("Current filenames:");
  fs.readdirSync(__dirname).forEach(file => {
    console.log(file);
  });
}
// The fs.rmdir() method is used to delete a directory at the given path. It can also be used recursively to remove nested directories.
// Syntax: 
// fs.rmdir( path, options, callback )
// Parameters: This method accept three parameters as mentioned above and described below:  

// path: It holds the path of the directory that has to be removed. It can be a String, Buffer or URL.
// options: It is an object that can be used to specify optional parameters that will affect the operation. It has three optional parameters:
// recursive: It is a boolean value which specifies if recursive directory removal is performed. In this mode, errors are not reported if the specified path is not found and the operation is retried on failure. The default value is false.
// maxRetries: It is an integer value which specifies the number of times Node.js will try to perform the operation when it fails due to any error. The operations are performed after the given retry delay. This option is ignored if the recursive option is not set to true. The default value is 0.
// retryDelay: It is an integer value which specifies the time to wait in milliseconds before the operation is retried. This option is ignored if the recursive option is not set to true. The default value is 100 milliseconds.
// callback: It is the function that would be called when the method is executed. 
// err: It is an error that would be thrown if the operation fails.
// Get the current filenames
// in the directory
getCurrentFilenames();
  
fs.rmdir("directory_one", () => {
  console.log("Folder Deleted!");
  
  // Get the current filenames
  // in the directory to verify
  getCurrentFilenames();
});
  
  
// Function to get current filenames
// in directory
function getCurrentFilenames() {
  console.log("\nCurrent filenames:");
  fs.readdirSync(__dirname).forEach(file => {
    console.log(file);
  });
  console.log("\n");
}

// The fs.stat() method is used to return information about the given file or directory. It returns an fs.Stat object which has several properties and methods to get details about the file or directory.

// Syntax:

// fs.stat( path, options, callback )

// Parameters: This method accept three parameters as mentioned above and described below:

// path: It holds the path of the file or directory that has to be checked. It can be a String, Buffer or URL.
// options: It is an object that can be used to specify optional parameters that will affect the output. It has one optional parameter:
// bigint: It is a boolean value which specifies if the numeric values returned in the fs.Stats object are bigint. The default value is false.
// callback: It is the function that would be called when the method is executed.
// err: It is an error that would be thrown if the method
// stats: It is the Stats object that contains the details of the file path.

fs.stat("./data/sample.txt", (error, stats) => {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Stats object for: ./data/sample.txt");
    console.log(stats);
  
    // Using methods of the Stats object
    console.log("Path is file:", stats.isFile());
    console.log("Path is directory:", stats.isDirectory());
  }
});
  
// Getting information for a directory
fs.stat("./data", (error, stats) => {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Stats object for: ./data");
    console.log(stats);
  
    // Using methods of the Stats object
    console.log("Path is file:", stats.isFile());
    console.log("Path is directory:", stats.isDirectory());
  }
});