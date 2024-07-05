 
const express = require("express");

const router = express.Router();

const {getCategory} = require("../Controllers/categoryController");
 
router.get("/", getCategory);   
router.post("/", (req, res) => {
   // var  branchId  = req.body.branchId;    
   // branchId = Number(branchId);
  //  req.session.BRANCHID=branchId;
  //  console.log(typeof branchId); 
//   console.log( branchId); 
var categoryId=req.body.categoryId;
// categoryId=Number(categoryId);
req.session.CATEGORYID=categoryId;
console.log(typeof categoryId);
console.log(categoryId);
  
    // Process the selected value (branchId) as needed
    // For example, you can save it to a database, perform calculations, etc.
  
    // Send a response back to the client
    // res.sendStatus(200);
    const shouldNavigate=true; 
    res.json({ shouldNavigate });
  });
module.exports= router;     