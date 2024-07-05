
const express = require("express");

const router = express.Router();

const {getEmployee} = require("../Controllers/employeeController");

router.get("/", getEmployee);


router.post("/",async function (req, res) { 
    var  order_id  = req.body.order_id;    
    order_id = Number(order_id);
    // req.session.BRANCHID=branchId; 
    // console.log(typeof buy_order_id); 
    console.log( order_id); 

    var query4=`select * from ORDER_DETAILS WHERE ORDER_ID= ${order_id}`;
    var result4 = await connection.execute(query4,[], {autoCommit:true});
 
    var customer_idd=result4.rows[0][1];
    var product_idd=result4.rows[0][2];
   
    var branch_idd=result4.rows[0][3];
    var company_idd=result4.rows[0][4];
    var category_idd=result4.rows[0][5];
    var quantityy=result4.rows[0][7];
    var Payment_Method=result4.rows[0][8];
    
    //this part will be done by trigger
    // var query6 = `UPDATE ORDER_DETAILS SET ORDER_QUANTITY=${0},PRODUCT_STATUS='Delivered' WHERE ORDER_ID=${order_id}`;           
    // var result6 = await connection.execute(query6,[], {autoCommit:true}); 

    var query7= `INSERT INTO SELL_INFO VALUES(${order_id},'${product_idd}',${branch_idd},${company_idd},'${category_idd}',SYSDATE,${quantityy},'${Payment_Method}')`;
    var result7 = await connection.execute(query7,[], {autoCommit:true}); 
 
    // var query8 = `UPDATE PRODUCT_INFO SET QUANTITY=QUANTITY-${quantityy} WHERE PRODUCT_ID='${product_idd}' AND BRANCH_ID=${branch_idd} AND COMPANY_ID=${company_idd}`;           
    // var result8 = await connection.execute(query8,[], {autoCommit:true}); 
 

    const shouldNavigate=true; 
    res.json({ shouldNavigate });
});

module.exports= router; 