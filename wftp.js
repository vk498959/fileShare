const express = require("express")
const app = express()
const multer = require('multer')
const fs = require('fs');
const { ip, pathh } = require("./input")
function startWebServer() {



    app.use("/public", express.static(pathh))


    app.use("/assets", express.static(__dirname + "/public"))
    var pathhh = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, pathh);
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    });
    var upload = multer({ storage: pathhh }).single('uploaded_file');

    app.post('/upload', async (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                console.log(err)
            } else {
                var FileName = req.file.filename;
                res.status(200).send("File with File Name<h1>" + FileName + "</h1> Uploaded successfully");
            }
        })
    });
    app.get("/", (req, res) => {
        if (req.query.file != null) {

        } else {
            const directoryPath = pathh;
            const fileList = fs.readdirSync(directoryPath);
            var htmlcontent = `<form action="/upload" enctype="multipart/form-data" method="post">
                                <input type="file"  name="uploaded_file">
                                <input type="submit" value="Upload">            
                            </form>`
            for (i = 0; i < fileList.length; i++) {


                if (fs.lstatSync(fileList[i]).isFile()) {
                    htmlcontent += `<h3><img src="/assets/file.svg" width="30px"; height="30px";><a href="/public/${fileList[i]}">${fileList[i]}</a></h3>`

                } else {
                    htmlcontent += `<h3><img src="/assets/folder.svg" width="30px"; height="30px";><a href="/public/${fileList[i]}">${fileList[i]}</a></h3>`

                }
            }
        }
        res.send(htmlcontent)
    })


    app.listen(8000, () => {
        console.log('you can also via browser with ' + ip + ':8000')
    })

}
module.exports = { startWebServer }