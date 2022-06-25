const express=require("express")

const bodyParser=require("body-parser")

let ejs = require('ejs');

const app=express()

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"));


app.listen(3000,function(){
   console.log("Server started on port 3000")
});


var items=["Exercise","Do some DSA questions","Complete some part of Angela Yu web development course"];
let workItems=[];


app.get("/",function(req,res){

   /* var todayy=new Date();

    const month = todayy.toLocaleString('default', { month: 'long' });
    

    var day="";
    var currentDay=todayy.getDay();*/

    var today=new Date();

    var options={
       weekday:"long",
       day:"numeric",
       month:"long"
    }

    var day=today.toLocaleDateString("en-US",options);

    //0 is for sunday and 6 is for saturday
//if(currentDay==0||currentDay==6){

    //res.send("<h1>Yay! It is the weekend</h1>");
  //  day="weekend";
    //res.sendFile(__dirname+"/weekend.html");
    
//}
  //  else{
    //Method to send html to server when there are only few tags
   /* res.write("<p>It is not the weekend:(</p>");
    res.write("<h1>Boo! I have to work</h1>");
    res.send();*/

    //day="weekday";
    //Method to send html to server when there are is an entire file
    //res.sendFile(__dirname+"/weekday.html");

    //}

    /*
switch(currentDay){
    case 0:day="Sunday, ";
           break;
    case 1:day="Monday, ";
           break;
    case 2:day="Tuesday, ";
           break;
    case 3:day="Wednesday, ";
           break;
    case 4:day="Thursday, ";
           break;
    case 5:day="Friday, ";
           break;
    case 6:day="Saturday, ";
           break;
    default:day="incorrect input, ";
           break;       
}
day=day+month;
*/

res.render("list",{ listTitle:day, newListItems:items});

});

//you can't write res.send() multiple times
//you can sendback only 1 piece of data
//when the server sees res.send() it sees it as the final sending instruction

//but you can use res.write() to send multiple pieces of data 

//WE SHALL USE EJS
//I.E. EMBEDDED JAVASCRIPT TEMPLATING

//do npm install ejs
/*
View engines allow us to render web pages using template files. 
These templates are filled with actual data and served to the client. 
There are multiple view engines, the most popular of which is Embedded Javascript (EJS).*/
/*
A response is rendered when a request is sent to the homepage.
 It selects an EJS file (in our case, myEJS.ejs) as a template to which arguments are passed from the Javascript file.
 This lets us create multiple HTML pages using the same base template.
 They may, however, have different values to be passed to them.*/

 //we saw how to pass variables from our server to our template file

 app.post("/",function(req,res){

       //console.log(req.body);
       let item=req.body.newItem;

       if(req.body.list==="Work"){
          workItems.push(item);
          res.redirect("/work");
       }
       else{
          items.push(item);
          res.redirect("/");
       }
    
    
 });

 app.get("/work",function(req,res){

       res.render("list",{ listTitle:"Work List", newListItems: workItems});      
} );  

app.post("/work",function(req,res){

       let item=req.body.newItem;
       workItems.push(item);
       res.redirect("/work");
      
} );  

//EJS does not specifically support blocks
//but layouts can be implemented using headers and footers
//the header and footer if included can be made to stay consistent across all websites