
const express = require("express");

const router = express.Router();

const {getOrder} = require("../Controllers/orderController");

router.get("/", getOrder);    
router.post("/",async function(req , res){   
    var Quantity = req.body.Quantity;  
    var PaymentMethod = req.body.PaymentMethod;  
    
     
    var temporary=req.body.action;    
  
    
    if(temporary=="addorder")  
    {  
        console.log(Quantity,PaymentMethod,temporary); 

        var query3=`select * from Product_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID} AND CATEGORY_ID= '${req.session.CATEGORYID}' AND PRODUCT_ID= '${req.session.PRODUCTID}'`;
        var result3 = await connection.execute(query3,[], {autoCommit:true});

        if(result3.rows.length==0)
        {
            var query=`select * from Product_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID} AND CATEGORY_ID= '${req.session.CATEGORYID}' AND PRODUCT_ID= '${req.session.PRODUCTID}'`;
            var result = await connection.execute(query,[], {autoCommit:true});
            var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result1 = await connection.execute(query1,[], {autoCommit:true});  
        
            res.render("order",{products:result.rows,company:result1.rows[0][0],error:"No Products Available"});
        }
        else
        {
            if(result3.rows[0][6]<Quantity)
            {
                var query=`select * from Product_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID} AND CATEGORY_ID= '${req.session.CATEGORYID}' AND PRODUCT_ID= '${req.session.PRODUCTID}'`;
                var result = await connection.execute(query,[], {autoCommit:true});
                var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
                var result1 = await connection.execute(query1,[], {autoCommit:true});  
            
                res.render("order",{products:result.rows,company:result1.rows[0][0],error:"Order Less than Quantity"});
            }
            else
            {
                
                // console.log("janina");
                // var query4=`SELECT NVL(MAX(order_id),0) FROM ORDER_DETAILS`;
                // function
                var query4=`SELECT GET_MAX_ORDER_ID() FROM dual`;
                var result4 = await connection.execute(query4,[], {autoCommit:true});
                var order_idd=result4.rows[0][0]+1;
 
                // console.log("janina1");  
 
                // update product quantity
                var query5 = `UPDATE PRODUCT_INFO SET QUANTITY=QUANTITY-${Quantity} WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID} AND CATEGORY_ID= '${req.session.CATEGORYID}' AND PRODUCT_ID= '${req.session.PRODUCTID}'`;           
                var result5 = await connection.execute(query5,[], {autoCommit:true});  
                // console.log("janina2");     
                // insert into order details
                console.log(req.session.USERNAME);
                var query6= `INSERT INTO ORDER_DETAILS VALUES(${order_idd},'${req.session.USERNAME}','${req.session.PRODUCTID}',${req.session.BRANCHID},${req.session.COMPANYID},'${req.session.CATEGORYID}',SYSDATE,${Quantity},'${PaymentMethod}','Received')`;
                var result6 = await connection.execute(query6,[], {autoCommit:true}); 


                var query=`select * from Product_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID} AND CATEGORY_ID= '${req.session.CATEGORYID}' AND PRODUCT_ID= '${req.session.PRODUCTID}'`;
                var result = await connection.execute(query,[], {autoCommit:true});
                var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
                var result1 = await connection.execute(query1,[], {autoCommit:true});  
            
                res.render("order",{products:result.rows,company:result1.rows[0][0],error:"Order Done"});
             
            }
        }
        
        



         
     
        // run query in user_info by this username 
        // const result=await connection.execute(`SELECT * FROM USER_INFO WHERE USER_ID = '${username}'`);
        // //console.log(username,password);
    
        // if (result.rows.length === 0){
        //     console.log('wrong username');
        //     res.render("logIn", {error : "Username Does Not Exist!"});  
        // }    
        // else {  
        //     //initial some global variable  
            
        //     var correct_password = result.rows[0][3];  
        //     console.log("Pass: ",correct_password); 
        //     if (password === correct_password){   

        //         req.session.USERNAME=username; 
        //         // console.log(req.session.USERNAME);   
        //         req.session.USERTYPE=result.rows[0][1];   
        //         req.session.COMPANYID=result.rows[0][2];
        //         if(req.session.USERTYPE=='Owner')res.redirect("/company"); 
        //         if(req.session.USERTYPE=='Manager')
        //         {
        //             var result_1=await connection.execute(`SELECT BRANCH_ID FROM MANAGER_INFO WHERE MANAGER_ID = '${username}'`);
        //             req.session.BRANCHID=result_1.rows[0][0];
        //             res.redirect("/branch");

        //         }
        //         if(req.session.USERTYPE=='Customer')
        //         {
        //             // var result_1=await connection.execute(`SELECT BRANCH_ID FROM MANAGER_INFO WHERE MANAGER_ID = '${username}'`);
        //             // req.session.BRANCHID=result_1.rows[0][0];
        //             res.redirect("/branch_table");

        //         }
        //         if(req.session.USERTYPE=='Supplier')
        //         {
        //             // var result_1=await connection.execute(`SELECT BRANCH_ID FROM MANAGER_INFO WHERE MANAGER_ID = '${username}'`);
        //             // req.session.BRANCHID=result_1.rows[0][0];
        //             res.redirect("/supplier");

        //         }
        //         // req.session.CURRENT_USER = username;  
        //         // req.session.CURRENT_CATEGORY = result.rows[0][1];
        //         //console.log('successful ' + req.session.CURRENT_USER);
        //     }
        //     else{
        //         res.render("logIn", {error : "Wrong Password!"});
        //         console.log('wrong password');
        //     }
        // }

        // if (username === 'buet' && password === 'buet1') {
        //     res.redirect("/buet");
        // } else {
        //     res.render("login",{error : "Invalid username or password!"});
            
        // } 
    } 
});

module.exports= router;      

