
const express = require("express");

const router = express.Router();
  
const {getBranchTable} = require("../Controllers/branch_tableController");
 
router.get("/", getBranchTable);   
router.post("/", (req, res) => {
    var  branchId  = req.body.branchId;    
    branchId = Number(branchId);
    req.session.BRANCHID=branchId;
    console.log(typeof branchId); 
    console.log( branchId); 
  
    // Process the selected value (branchId) as needed
    // For example, you can save it to a database, perform calculations, etc.
  
    // Send a response back to the client
    // res.sendStatus(200);
    var UserType=req.session.USERTYPE;
    const shouldNavigate=true; 
    res.json({ shouldNavigate ,UserType});
  });
module.exports= router; 