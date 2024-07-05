
const express = require("express");

const router = express.Router();

const {getSellinfo} = require("../Controllers/sellinfoController");

router.get("/", getSellinfo);

// router.post("/",async function (req, res) { 
//     var  buy_order_id  = req.body.buy_order_id;     
//     buy_order_id = Number(buy_order_id);
//     // req.session.BRANCHID=branchId;  
//     // console.log(typeof buy_order_id); 
//     // console.log( buy_order_id); 

//     var query4=`select * from BUY_ORDER WHERE BUY_ORDER_ID= ${buy_order_id}`;
//     var result4 = await connection.execute(query4,[], {autoCommit:true});
//     var manager_namee=result4.rows[0][2];
//     var product_idd=result4.rows[0][1];
//     var category_idd=result4.rows[0][3]; 
//     var quantityy=result4.rows[0][5];
 
//     // console.log( manager_namee); 


//     var query5 = `SELECT BRANCH_ID FROM BRANCH_INFO WHERE MANAGER_ID= '${manager_namee}'`;           
//     var result5 = await connection.execute(query5,[], {autoCommit:true}); 
//     var branch_idd=result5.rows[0][0]; 
//     // console.log( branch_idd);  
    

//     // by trigger
//     // var query6 = `UPDATE BUY_ORDER SET BUY_QUANTITY=${0} WHERE BUY_ORDER_ID=${buy_order_id}`;           
//     // var result6 = await connection.execute(query6,[], {autoCommit:true}); 

//     var query7= `INSERT INTO BUY_INFO(BUY_ORDER_ID,SUPPLIER_ID,PRODUCT_ID,CATEGORY_ID,SUPPLY_DATE) VALUES(${buy_order_id},'${req.session.USERNAME}','${product_idd}','${category_idd}',SYSDATE)`;
//     var result7 = await connection.execute(query7,[], {autoCommit:true}); 

//     var query8 = `UPDATE PRODUCT_INFO SET QUANTITY=QUANTITY+${quantityy} WHERE PRODUCT_ID='${product_idd}' AND BRANCH_ID=${branch_idd} AND COMPANY_ID=${req.session.COMPANYID}`;           
//     var result8 = await connection.execute(query8,[], {autoCommit:true}); 

//     // Process the selected value (branchId) as needed
//     // For example, you can save it to a database, perform calculations, etc.
   
//     // Send a response back to the client 
//     // res.sendStatus(200);
//     const shouldNavigate=true; 
//     res.json({ shouldNavigate });
//   });
 
module.exports= router;  