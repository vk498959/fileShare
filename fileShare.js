// import ipadresses from './ipfetch'
import inquirer from 'inquirer';
import path from 'path';
import ftpserv from './ftp.js'
import webserver from './wftp.js'
import generateQR from './qr.js';
import allIP from './ipfetch.js'
// const currentDir = import.meta.dirname;

var username="username"
var password="password"
var ipAddress="127.0.0.1"
var CustomPath=path.join()
async function usernameandpasswordfun(){
    let user=await inquirer.prompt([{
        name:'user',
        message:"Enter the new Username",
        type:"input"
    }])
    let pass=await inquirer.prompt([{
        name:"pass",
        message:"Enter new Password",
        type:"input"
    }])
    username=user.user
    password=pass.pass
}
async function ipaddressfun(){
const ipaddresses = [
    {
      type: 'list', // This is the "select" prompt type in Inquirer.js
      name: 'ipp',
      message: 'Select the IP Addresses which you want to run',
      choices: allIP
    }
  ];
  const answers = await inquirer.prompt(ipaddresses);
  ipAddress=answers.ipp

}
async function custompathfun(){
const questions = [
    // 1. The Confirmation Prompt (Yes/No)
    {
      type: 'confirm',
      name: 'is_okay',
      message: 'Do you want to run on Application Root Directory',
      default: true, // Default to Yes (true)
    },
    
    // 2. The Conditional Input Prompt
    // This prompt is ONLY asked if the answer to 'is_okay' is false (i.e., the user said 'No').
    {
      type: 'input',
      name: 'reason_input',
      message: 'Enter your custom Path like C:/user/download',
      // The 'when' function: takes the current answers object and returns a boolean.
      // The question is asked only if this function returns true.
      when: (answers) => {
        // We only show this question if the user answered 'false' to the 'is_okay' question.
        return answers.is_okay === false; 
      },
      // You can also add validation for the input here
      validate: (input) => {
        return input.length > 0 ? true : 'You must provide a reason for the change.';
      },
    },
  ];

  const answers = await inquirer.prompt(questions);

  console.log('\n--- Final Results ---');
  
  if (answers.is_okay) {
    console.log('Run on App root Path');
  } else {
    console.log(`Run on Your custom Path: ${answers.reason_input}`);

  }
  CustomPath=answers.reason_input
}


async function exefun(){
    await ipaddressfun()
    console.log("okay code")
    let serverType = await inquirer.prompt([{
        type:"list",
        name:"ServerType",
        message:"You want to run this server on which ",
        choices:['Default_Setting','Customised_Setting']
    }]);
console.log(await serverType.ServerType)
    if(serverType.ServerType=='Default_Setting'){
        webserver(ipAddress, CustomPath)
        generateQR(ipAddress)
    }else{
    let answer = await inquirer.prompt([{
        type:"list",
        name:"ServerType",
        message:"Which Server you want to run",
        choices:['FTP Server','Web Server','Web Server without QR', 'Both']
    }]);
    if(answer.ServerType=='FTP Server'){
        await usernameandpasswordfun()
        await custompathfun()
        ftpserv(ipAddress,username,password,CustomPath)
    }
    if(answer.ServerType='Web Server'){
        webserver(ipAddress, CustomPath)
        generateQR(ipAddress)
    }
    if(answer.ServerType='Web Server without QR'){
        webserver(ipAddress, CustomPath)
    }
    if(answer.serverType='Both'){
        await usernameandpasswordfun()
        await custompathfun()
        webserver(ipAddress, CustomPath)
        ftpserv(ipAddress,username,password,CustomPath)
    }
    }
}
// ipaddressfun()
exefun()
// ftpserv("127.0.0.1","user","password","C:/")
//    webserver("127.0.0.1", "C:/Users/Admin/Downloads/paper")
// generateQR("127.0.0.1")

