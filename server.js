var express = require("express");
var app = express();
var router = express.Router();

var views = __dirname + '/views/';
const PORT = 8080;
const HOST = '0.0.0.0';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(views + "index.html");
});

router.get("/sharks",function(req,res){
  res.sendFile(views + "sharks.html");
});

app.use('/assets', express.static('assets'));
app.use("/", router);

app.listen(PORT, HOST, function () {
  console.log('Num Hub app listening on port ' + PORT + '')
})
