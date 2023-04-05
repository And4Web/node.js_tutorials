const process = require('process');

console.log(process);
console.log(process.arch);

console.log(process.argv);

console.log(process.argv0);

console.log('current working directory: ', process.cwd())
try {
 
  // Change the directory
  process.chdir('./data');
  console.log('directory changed to: ', process.cwd())
} catch (err) {
     
  // Printing error if occurs
  console.error("error while changing directory: ", error.message);
}

console.log(process.config);

const usage = process.cpuUsage({
  user: 62000,
  system: 31000
});
  
// Printing returned value
console.log(usage);

console.log("Current working directory: ", process.cwd());

console.log("debug port is " + process.debugPort);

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


process.nextTick(() => {
  console.log('Executed in the next iteration');
});
 
console.log('Executed in the current iteration');

