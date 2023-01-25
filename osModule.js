//source: https://www.geeksforgeeks.org/node-js-os/?ref=lbp

/*
OS is a node module used to provide information about the computer operating system. 
Advantages: 
It provides functions to interact with the operating system. It provides the hostname of the operating system and returns the amount of free system memory in bytes. 
*/
var os = require('os');
// return the cpu architecture
console.log("CPU architecture: " + os.arch());
  
/// It returns the amount of free system memory in bytes
console.log("Free memory: " + os.freemem()/1024/1024/1024 + ' GB');
  
// It return total amount of system memory in bytes
console.log("Total memory: " + os.totalmem()/1024/1024/1024 + ' GB');
  
// It returns the list of network interfaces
console.log('List of network Interfaces: ' + os.networkInterfaces());
  
// It returns the operating systems default directory for temp files.
console.log('OS default directory for temp files : ' + os.tmpdir ());

// return the endianness of system
console.log("Endianness of system: " + os.endianness());
  
// It returns hostname of system
console.log("Hostname: " + os.hostname());
  
// It return operating system name
console.log("Operating system name: " + os.type());
  
// It returns the platform of os
console.log('operating system platform: ' + os.platform());
  
// It returns the operating systems release.
console.log('OS release : ' + os.release());

// returns an object containing information about each logical CPU core.
console.log('OS cpus : ' + os.cpus().forEach(cpu=>{
  console.log(cpu)
}));

// Printing os.homedir() value
console.log(os.homedir());
// Printing os.hostname() value
console.log(os.hostname());

/*
Endianness refers to the order of bits in a sequence within a binary representation of a number.

The os.endianness() method is an inbuilt application programming interface of the os module which is used to get endianness of the CPU of the computer for which the node.js is compiled.
*/
/*
The os.getPriority() method is an inbuilt application programming interface of the os module which is used to get the scheduling priority of the process specified by pid.

Syntax: 

os.getPriority( pid )
Parameters: This method accept single parameter as mentioned above and described below:  

pid: It is an optional parameter that specifies the process id whose scheduling priority to be returned. It’s default value is 0.
Return Value: This method returns an integer value that specifies the scheduling priority of the process specified by pid. If the value of process id (pid) is set to 0 then it returns the scheduling priority of the current process.

Below examples illustrate the use of os.getPriority() method in Node.js:

Example 1:  
*/
// Node.js program to demonstrate the   
// os.getPriority() Method
  
// Require os module
const os = require('os');
  
// Printing os.getPriority() value
try {
  
    // Printing priority of current process
    console.log(os.getPriority());
}catch(err){
    console.log(i + ": error occured" + err);
}

// Example 2:  
// Node.js program to demonstrate the   
// os.getPriority() Method
  
// Require os module
const os = require('os');
  
// Accessing  ps-list module to
// get process details
const psList = require('ps-list');
   
// Calling psList function defined
// in ps-list module
psList().then(data => {
  
    // Printing all the process information
    // from returned data
    console.log(data);
  
    // Iterating through each element
    // of the returned data
    data.forEach(function(element){
        try{
          
            // Getting priority of selected process
            var process_priority=os.getPriority(element.pid);
          
            // Printing pid priority and process name 
            console.log("pid:" + String(element.pid)
                + "\t priority:" + String(process_priority)
                + "\t name:" + String(element.name));
        }catch(err){
  
            // There will be error like operation
            // not permitted, so omitting error to
            // get clean output printing error
            // generated from os.getPriority() function
            //console.log("pid:"+String(element.pid)+
            //"\t priority: error \t name:"
            //+String(element.name)); console.log(err);
      }
  });
});