const prompt = require("prompt-sync")()

console.log(`
    Press 1 For running on Default Setting
    Press 2 For customize the Server
    `)
var serverRunType = prompt("Enter 1 or 2:- ")

if (serverRunType == "1") {
    const { defaultInput } = require("./input")
    defaultInput()
    const { startFTPServer } = require("./ftp");
    startFTPServer();
    const { startWebServer } = require("./wftp")
    startWebServer();
    const { generateQR } = require("./qr")
    generateQR();
} else {
    const { takeInput } = require("./input")
    takeInput()
    console.log(`
        Press 1 For running Both FTP & WebServer
        Press 2 For FTP Server Only
        Press 3 For WebServer Only & QR Generation
        `)
    var serverType = prompt("Enter 1, 2 or 3 only:- ")
    if (serverType == "1") {
        const { startFTPServer } = require("./ftp");
        startFTPServer();
        const { startWebServer } = require("./wftp")
        startWebServer();
        const { generateQR } = require("./qr")
        generateQR();
    }
    if (serverType == "2") {
        const { startFTPServer } = require("./ftp");
        startFTPServer();
    }
    if (serverType == "3") {
        const { startWebServer } = require("./wftp")
        startWebServer();
        const { generateQR } = require("./qr")
        generateQR();
    }

}



