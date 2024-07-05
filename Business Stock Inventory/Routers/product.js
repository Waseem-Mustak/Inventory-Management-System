
const express = require("express");

const router = express.Router();

const {getProduct} = require("../Controllers/productController");

router.get("/", getProduct); 
router.post("/", (req, res) => {
    // var  branchId  = req.body.branchId;    
    // branchId = Number(branchId);
   //  req.session.BRANCHID=branchId;
   //  console.log(typeof branchId); 
 //   console.log( branchId); 
 var productID=req.body.productID;
 // categoryId=Number(categoryId);
 req.session.PRODUCTID=productID;
 console.log(typeof productID);
 console.log(req.session.PRODUCTID);
   
     // Process the selected value (branchId) as needed
     // For example, you can save it to a database, perform calculations, etc.
   
     // Send a response back to the client
     // res.sendStatus(200);
     const shouldNavigate=true;  
     UserType=req.session.USERTYPE;
     res.json({ shouldNavigate, UserType});
   });
module.exports= router; 