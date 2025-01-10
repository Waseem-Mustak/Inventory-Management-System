const bodyParser=require("body-parser");
const path=require("path");
const dotenv=require("dotenv");
const oracledb  = require("oracledb");
const session  = require("express-session");
  
//routers  
const logIn=require("./Routers/logIn");  
const company=require("./Routers/company");
const branch=require("./Routers/branch");   
const branch_table=require("./Routers/branch_table");  
const category=require("./Routers/category");   
const product=require("./Routers/product");
const supplier=require("./Routers/supplier");
const order=require("./Routers/order");
const employee=require("./Routers/employee");
const customers_order=require("./Routers/customers_order");
const sellinfo=require("./Routers/sellinfo");
const buyinfo=require("./Routers/buyinfo"); 
const allbranchsellinfo=require("./Routers/allbranchsellinfo"); 
const allbranchbuyinfo=require("./Routers/allbranchbuyinfo"); 

     
 
   
//app     
const express= require('express'); 
const app=express();
const port=3000; 

app.set("view engine","ejs");
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.json()); 
app.use(express.urlencoded());
dotenv.config();


app.use(express.static(path.join(__dirname,'public')));

app.use(session({
    secret : 'project8588',
    resave : false,
    saveUninitialized : true,
}));


app.use("/",logIn);
app.use("/company",company);
app.use("/company/branch",branch);  
app.use("/company/branch_table",branch_table); 
app.use("/branch",branch);   
app.use("/branch_table",branch_table); 
app.use("/company/branch/category",category);  
app.use("/company/branch/category/product",product);  
app.use("/company/branch/category/product/order",order);   
app.use("/supplier",supplier); 
app.use("/order",order); 
app.use("/employee",employee); 
app.use("/customers_order",customers_order); 
app.use("/sellinfo",sellinfo); 
app.use("/buyinfo",buyinfo); 
app.use("/allbranchsellinfo",allbranchsellinfo); 
app.use("/allbranchbuyinfo",allbranchbuyinfo); 

 
// connection to database
const {connectToDB} = require("./Routers/connection");
async function run(){
    connection=connectToDB();
} 

run();
  

app.listen(port, ()=>{
    console.log("Running server (//)");
});



// //external imports
// const bodyParser = require("body-parser");
// const path = require("path");
// const dotenv = require("dotenv"); 

 
// //importing routers
// const logIn = require(".//Routers/logIn");
// // const buet = require("./Routers/buet");
// // const buetDepartments = require("./Routers/buetDepartments");
// // const buetPrereq = require("./Routers/buetPrereq");
// // const buetupdate = require("./Routers/buetupdate");


// //creating app with express
// const express = require('express');
// const app = express();
// const port = 3000;

// //setting view engine
// app.set("view engine","ejs");
// app.set('views', path.join(__dirname, 'views'));
// app.use(bodyParser.json());
// app.use(express.urlencoded());
// dotenv.config();

// //all the pages that need to be routeda
// app.use(express.static(path.join(__dirname,'public')));
// app.use("/" , logIn);
// // app.use("/buet" , buet);
// // app.use("/buet/departments" , buetDepartments);
// // app.use("/buet/prereq" , buetPrereq);
// // app.use("/buet/update" , buetupdate);

// // Start the server and listen on port 3000
// app.listen(port, () => {
//   console.log("Server is running");
// });

// // app.get("/",(req,resp)=>{
// // resp.send("App is kkjhgfk")
// // }
// // );

// const bodyParser = require("body-parser");
// const path = require("path");
// // const dotenv = require("dotenv");

// const logIn = require("./Routers/logIn");


// const express = require('express');
// const app = express();
// const port = 3000; 

// app.set("view engine","ejs");
// app.set('views', path.join(__dirname, 'views'));
// app.use(bodyParser.json());
// app.use(express.urlencoded());
// // dotenv.config();

// // app.use(express.static(path.join(__dirname,'public')));
// // app.use("/" , logIn);



// app.get("/",(req,resp)=>{
// resp.send("App is kkk")
// }
// );

// app.listen(port, () => {
//     console.log("Server is running");
//   });

// // app.listen(3000);
// // console.log("jhg");
// //  .catch(err,console.log("ll"));


// const bodyParser=require("body-parser");
// const path=require("path");
// const dotenv=require("dotenv");


// //routers
// const logIn=require("./Routers/logIn");



// //app
// const express= require('express');
// const app=express();
// const port=3000;

// app.set("view engine","ejs");
// app.set('views',path.join(__dirname,'views'));
// app.use(bodyParser.json());
// app.use(express.urlencoded());
// dotenv.config();


// app.use(express.static(path.join(__dirname,'public')));
// app.use("/",logIn);

// app.listen(port, ()=>{
//     console.log("Running");
// });



