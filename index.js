const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { PythonShell } = require("python-shell");
const {spawn} = require('child_process');
const fs = require("fs");
var request = require('request-promise');


var list=[];
var displink="";

app.set('view engine','ejs');
app.use(express.static(__dirname+"/Public"));
app.use(bodyParser.urlencoded({extended:true}));

var today= new Date();
var currentyear= today.getFullYear();


app.get("/",function(req,resp)
{
    resp.render("List",{gayrintu:currentyear});
});

app.get("/Listout",function(req,resp)
{
  

  // const jsonString = fs.readFileSync("D:/minor proj/python/scam_collection.json");
  // var mydata = JSON.parse(jsonString);
  // list=mydata.scam;
  console.log("your desired list is"+list);

  setTimeout(resp.render("Listout",{lists:list,links:displink,gayrintu:currentyear}),3000)



});



app.get("/about",function(req,resp)
{
    resp.render("About",{gayrintu:currentyear})
});

app.post("/",function(req,resp)
{


  let item=req.body.link
  l1=item.slice(0,23)
  l2=item.slice(32)
  displink=l1+"/embed/"+l2;
  console.log(displink);
  // validating youtube urls..
  var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if(displink.match(p))
  {


  async function commspy(){
      var data=item;
  
  
  var options={
      method:'POST',
      uri:'http://127.0.0.1:5000/commspy',
      body:data,
      json:true
  };
  
  var sendrequest = await request(options)
    
  // The parsedBody contains the data
  // sent back from the Flask server 
  .then(function (parsedBody) {

      // console.log(parsedBody);
        
      // You can do something with
      // returned data
      list=parsedBody.scam;
      console.log(list);
  })
  .catch(function (err) {
      console.log(err);
  });
  }
  
  commspy();








  // setTimeout(function(resp)
  // {
  //   console.log("power")
  // },5000);
  resp.redirect("Listout");

  // if (setTimeout(function(){console.log("hello")},5000))
  // {
    
  // }



  


  //     setTimeout(function()
  //     {

  //       console.log("demo print if code running");
  //       resp.redirect("Listout");

  //     },15000);
  }
  else
  {
  resp.render("About");
  }
});




app.listen(process.env.PORT || 3000 ,function()
{
  console.log("server running at given port");
});