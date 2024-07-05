
const express = require("express");

const router = express.Router();

const {getCustomers_order} = require("../Controllers/customers_orderController");

router.get("/", getCustomers_order);

router.post("/",async function (req, res) { 
    var  order_id  = req.body.order_id;     
    order_id = Number(order_id);
    // req.session.BRANCHID=branchId;
    // console.log(typeof order_id); 
    console.log( order_id); 
 
    var query4=`select * from ORDER_DETAILS WHERE order_id= ${order_id}`;
    var result4 = await connection.execute(query4,[], {autoCommit:true});
    var quantityy=result4.rows[0][7];
    var product_idd=result4.rows[0][2];
    var branch_idd=result4.rows[0][3];
    var company_idd=result4.rows[0][4];

    console.log( product_idd,branch_idd,company_idd,quantityy);


                    // var query5 = `SELECT BRANCH_ID FROM BRANCH_INFO WHERE MANAGER_ID= '${manager_namee}'`;           
                    // var result5 = await connection.execute(query5,[], {autoCommit:true}); 
                    // var branch_idd=result5.rows[0][0]; 
                    // console.log( branch_idd);  

    var query6 = `UPDATE ORDER_DETAILS SET PRODUCT_STATUS='Cancelled' WHERE order_id=${order_id}`;           
    var result6 = await connection.execute(query6,[], {autoCommit:true}); 

    // var query7= `INSERT INTO BUY_INFO(order_id,SUPPLIER_ID,PRODUCT_ID,CATEGORY_ID,SUPPLY_DATE) VALUES(${order_id},'${req.session.USERNAME}','${product_idd}','${category_idd}',SYSDATE)`;
    // var result7 = await connection.execute(query7,[], {autoCommit:true}); 

    var query8 = `UPDATE PRODUCT_INFO SET QUANTITY=QUANTITY+${quantityy} WHERE PRODUCT_ID='${product_idd}' AND BRANCH_ID=${branch_idd} AND COMPANY_ID=${company_idd}`;           
    var result8 = await connection.execute(query8,[], {autoCommit:true}); 

    // Process the selected value (branchId) as needed
    // For example, you can save it to a database, perform calculations, etc.
  
    // Send a response back to the client
    // res.sendStatus(200);
    const shouldNavigate=true; 
    res.json({ shouldNavigate });
  });

module.exports= router;  