//npm packages
const EXPRESS = require("express")
const FILESYSTEM = require("fs")
const BODYPARSER = require("body-parser")

const endpoints = require("./endpoints/endpoints.js")

let port = 8080;
let webServer = EXPRESS();

webServer.use(BODYPARSER.json())
webServer.use(BODYPARSER.urlencoded({extended:true}))

webServer.use(function(req, res, next){

  //console.log(req.url + " " + req.method +" | "+JSON.stringify(req.body));
  //console.log("request: " + requests);
  FILESYSTEM.appendFile(__dirname+'/Server.log',req.ip + " " + new Date() + " " + req.url + " " + req.method +" "+JSON.stringify(req.body) + " ||| " + JSON.stringify(req.query)+"\"\n",{flag:"a"},()=>{});
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, SEARCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //console.log(__dirname+'/Server.log');

  if(req.method == "OPTIONS")
  {
    res.status(200);
    res.end();
  }
  else
  next();
  });

  webServer.use(endpoints)
  webServer.use(EXPRESS.static(__dirname +"\\webpages"))
  webServer.listen(port, function(){
  console.log("webserver running on port " + port);
})
