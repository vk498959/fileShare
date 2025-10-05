import QRCode from 'qrcode'
export default function generateQR(ip){
    QRCode.toString('http://'+ip+':8000',{type:'terminal'}, function (err, url) {
        console.log(url)
      })
}

