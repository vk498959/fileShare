var QRCode = require('qrcode')
var {ip}=require("./input")
function generateQR(){
    QRCode.toString('http://'+ip+':8000',{type:'terminal'}, function (err, url) {
        console.log(url)
      })
}

module.exports={generateQR}