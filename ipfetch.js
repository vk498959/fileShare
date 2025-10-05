import os from 'os'
const interfaces = os.networkInterfaces()


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
export default serverip