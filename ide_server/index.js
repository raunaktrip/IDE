const express= require("express");
require('dotenv').config();
const https= require("https");
var request = require('request');
const bodyParser= require('body-parser');
const axios = require("axios");
const cors = require("cors");
const app= express();
app.use(bodyParser.urlencoded({extended:true}));
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));



app.get('/',function(req,res){

   // console.log(req.body);
  //res.sendFile(__dirname+"/index.html");
});

app.post('/',function(req,res){
  const clientId =process.env.CLIENT_ID;
const clientSecret=process.env.CLIENT_SECRET;
   console.log('got request from frontend');
   
   //res.send("request received");
   var code=req.body.code;
   var input = req.body.input;
   var lang= req.body.language;
   var version_index='0';
   if(lang==='cpp') lang= 'cpp17';
   else if(lang==='python') lang= 'python3';
   else if(lang==='javascript') lang='nodejs';
   else if(lang==='java') version_index="1";
   console.log(lang)
   var program = {
    script : code,
    language: lang,
    versionIndex: version_index,
    clientId: clientId,
    stdin:input,
    clientSecret:clientSecret
};
request({
    url: 'https://api.jdoodle.com/v1/execute',
    method: "POST",
    json: program
},
function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(body);
});
});




app.listen(3001,function(){
  console.log("Server started at port number 3001");
});


