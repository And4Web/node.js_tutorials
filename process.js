const process = require('process');
// The process.arch property is an inbuilt application programming interface of the process module which is used to get CPU architecture of the computer for which the current node.js is compiled.

// Syntax:
// process.arch
// Return Value: This property returns the operating system CPU architecture for which the current node.js is compiled for. The possible values are ‘x32’, ‘x64’, ‘arm’, ‘arm64’, ‘s390’, ‘s390x’, ‘mipsel’, ‘ia32’, ‘mips’, ‘ppc’ and ‘ppc64’.
console.log(process);
console.log(process.arch);

// The process.argv property is an inbuilt application programming interface of the process module which is used to get the arguments passed to the node.js process when run in the command line.

// Syntax:
// process.argv
// Return Value: This property returns an array containing the arguments passed to the process when run it in the command line. The first element is the process execution path and the second element is the path for the js file.
console.log(process.argv);

// The process.argv0 property is an inbuilt application programming interface of the process module which is used to get the read-only copy of the original value of argv[0] passed to the node.js process when running the command line.

// Syntax:
// process.argv0
// Return Value: This property returns a string that specifies the first argument passed to the process when running in the command line.
console.log(process.argv0);

// The process.chdir() method is an inbuilt application programming interface of the process module which is used to change the current working directory. Syntax:
// process.chdir( directory )

// Parameters: This method accepts single parameter as mentioned above and described below:

// directory: It is required parameter that specifies the path to the directory to which current working directory to be changed.
// Return Value: This method does not return any value on success but throws an exception if fails to change directory specifying that “no such file or directory”.
console.log('current working directory: ', process.cwd())
try {
 
  // Change the directory
  process.chdir('./data');
  console.log('directory changed to: ', process.cwd())
} catch (err) {
     
  // Printing error if occurs
  console.error("error while changing directory: ", error.message);
}

// The process.config property is an inbuilt application programming interface of the process module which is used to get the JavaScript representation of the configure options that are used to compile the current node.js code.
// Syntax: 
// process.config
// Return Value: This property returns an object containing the configuration in JavaScript representation those are used to compile currently executable node.js. 
console.log(process.config);

// The process.cpuUsage() method is an inbuilt application programming interface of the Process module which is used to get the user, system CPU time usage of the current process. It is returned as an object with property user and system, values are in microseconds. Return values may differ from the actual time elapsed especially for multi-core CPUs.

// Syntax: 
// process.cpuUsage( previous_value )
// Parameters: This method accepts a single parameter as mentioned above and described below:  
// previous_value: It is an optional parameter, an object returned by the calling process.cpuUsage() previously. If it is passed then the difference is returned.
// Return: This method returns an object on success, which contains properties like user and system, with some integer value that signifies time elapsed by the process, measured in microseconds. 
// user: It is an integer that represents the time elapsed by user
// system: It is an integer represents the time elapsed by system
// Calling process.cpuUsage() method
const usage = process.cpuUsage({
  user: 62000,
  system: 31000
});
  
// Printing returned value
console.log(usage);

//The process.cwd() method is an inbuilt application programming interface of the process module which is used to get the current working directory of the node.js process. 
// Syntax:
// process.cwd()
// Parameters: This method does not accept any parameters. Return Value: This method returns a string specifying the current working directory of the node.js process.
console.log("Current working directory: ", process.cwd());

// The process.debugPort property is an inbuilt application programming interface of the process module which is used to get the debugging port used by the debugger if enabled.

// Syntax:
// process.debugPort
// Return Value: This property returns an integer value that specifies the debugging port used by the debugger if enabled.
console.log("debug port is " + process.debugPort);

// The process.env property is an inbuilt application programming interface of the process module which is used to get the user environment. Syntax:
// process.env
// Return Value: This property returns an object containing the user environment. 
// Printing process.env property value
var no_env = 0;
 
// Calling process.env
var env = process.env;
 
// Iterating through all returned data
for (var key in env) {
     
    // Print value
    console.log(key + ":\n\t" + env[key] + "\n");
    no_env++;
}
 
// Printing count
console.log("total no of values available = "
            + no_env);
 
// Accessing one by one
console.log("operating system: " + env['OS']);
console.log("alluserprofile: " + env['ALLUSERSPROFILE']);
console.log("public directory: " + env['PUBLIC']);

//process.nextTick() is used in real-time applications to defer the execution of a function until the next Event Loop Iteration.
// Syntax:
// process.nextTick()
// Return Value:
// In the code of snippet, the second console is printed first because this is a part of the current iteration of the event loop, and the first console is a part of a callback function that is associated with the process.nextTick() executed in the next iteration of the event loop.
process.nextTick(() => {
  console.log('Executed in the next iteration');
});
 
console.log('Executed in the current iteration');

// 