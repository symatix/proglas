var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = Express();

var IMG_PATH = "./www/assets";

app.use(bodyParser.json());


var Storage = multer.diskStorage({
   destination: function (req, file, callback) {
      callback(null, IMG_PATH);
   },
   filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
   }
});

var upload = multer({
   storage: Storage
}).array("img", 3);



app.get("/", function (req, res) {
   res.sendFile(__dirname + "/www/index.html");
});

app.get("/upload", function (req, res) {
   res.sendFile(__dirname + "/www/upload.html");
});

app.post("/api/upload", function (req, res) {
   upload(req, res, function (err) {
      if (err) {
         return res.end("Something went wrong!");
      }

      console.log(res)
      return res.end("File uploaded sucessfully!.");
   });
});


app.listen(2000, function (a) {
   console.log("Listening to port 2000");
});