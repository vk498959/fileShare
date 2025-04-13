var prompt = require('prompt-sync')();
const os = require("os")
const interfaces = os.networkInterfaces()
const path=require("path")


//server ipv4 details fetching
var serverip = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            serverip.push(address.address);
        }
    }
}
if (!address.length) {
    serverip.push("127.0.0.1");
}




function takeInput() {
    ip = prompt("Enter IP address of the system like 127.0.0.1:- ")
    user = prompt("Set your Username:- ")
    pass = prompt("Set your Password:- ")
    pathh = prompt("Enter Full File Path C:/user/:- ")
    module.exports = { ip, user, pass, pathh }
}
function defaultInput() {
    var ip = serverip[0];
    var user = "username"
    var pass = "password"
    var pathh = path.join(__dirname,"..")
    module.exports = { ip, user, pass, pathh }
}
module.exports = { takeInput, defaultInput }