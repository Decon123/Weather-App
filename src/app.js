//this is a node module to file paths
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("postman-request");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
//Register the views path and the partials path
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

//creating a web server from express for get requests & give responsers for our application
//this is the server
//Get the express server
const app = express();

//Set the express server to use hbs view engine
app.set("view engine","hbs");
app.set("views",viewsPath);

                        //partials
hbs.registerPartials(partialsPath);

//console.log(__dirname);
//console.log(__filename);
//../file name --- by using this it go to a higher directory from the current directory

            //Register the static files path
const publicDirectoryPath = path.join(__dirname,"../public");
/*
//console.log(publicDirectoryPath);
//server(app) use this directory to access static files
*/
app.use(express.static(publicDirectoryPath));


/*
console.log(__dirname);

console.log(__filename);
*/
//way of creating a route
//route means basically the links 
//--ex: //cafekumbuk.com
        //cafekumbuk.com/about
        //cafekumbuk.com/help

//setting up the server to listen routes   
    
app.get("/",(req,res)=>{
    //res.send("<h1>Hi EveryOne</h1>");
    res.render("index",{
        title:"Weather",
        name:"Decon"
    });
});        

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Us",
        name:"Yasiru"
    });
});

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"Bimsara"
    });
});
/*
//getting request from users and validating the requests
app.get("/products",(req,res)=>{
   // console.log(req.query.search);
    if(!req.query.search) {
       console.log("No search is found");
    }

    res.send({
        products:[]
    });
});
*/
app.get("/form",(req,res)=>{
    res.render("form",{
        title:"Fill the form",
        name:"usename"
    });
});

app.get("/weather",(req,res)=>{
    //console.log(req.query.address);
    if(!req.query.address){
        res.send({
            error:"You must provide an address"
        });
        return;
    }
    geocode(req.query.address,(error,response)=>{
        if(error) {
            return res.send({
                error:error
            });
        }

        forecast(response.latitude,response.longtitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:error
                });
            }
            res.send({
                forecast:forecastData,
                location:response.location,
                address:req.query.address
            });
        });
    });
 
});
 

//put this error checking at the end
app.get("*",(req,res)=>{
    res.render("404err",{
        title:404,
        error:"404 page not found!",
        name:"Decon"
    });
});
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});


//to communicate with other computers securely we use a comminucate standard(protocol) SSH -- Secure shell
//SSH has 2 main keys
//1)private key -- this is in our PC
//2)public key -- this is to the public we want to communicate

console.log("Decon");