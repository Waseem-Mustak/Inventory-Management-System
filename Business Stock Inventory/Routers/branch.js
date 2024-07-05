
const express = require("express");
 
const router = express.Router();  
 
const {getBranch} = require("../Controllers/branchController");
    
router.get("/", getBranch);   
router.post("/",async function(req , res){ 
    var regEmployeeUsername = req.body.regEmployeeUsername;  
    var regEmployeePassword = req.body.regEmployeePassword;  
    var EmployeeName = req.body.EmployeeName;   
    var salary = req.body.salary; 
    var Category = req.body.Category; 

    var ProductName = req.body.ProductName; 
    var per_unit_Price = req.body.per_unit_Price; 
    var Quantity = req.body.Quantity; 
    var Color = req.body.Color; 
    var Size = req.body.Size; 
    var Discount = req.body.Discount; 


    var ProductName_d = req.body.ProductName_d; 


     
    var temporary=req.body.action;    

    console.log(regEmployeeUsername,regEmployeePassword,EmployeeName,salary,temporary);
    if(temporary=="reg-employee-user")  
    {  
          // registration_on=1;
        console.log("KJHGFD");
        // run query in user_info by this username 
        const result=await connection.execute(`SELECT password FROM USER_INFO WHERE USER_ID = '${regEmployeeUsername}'`);
        //console.log(username,password);
     
        if (result.rows.length === 0){ 
 
            // username_already_exist_or_not=1;
            const query2 = `INSERT INTO USER_INFO (USER_ID, USER_TYPE,COMPANY_ID,PASSWORD) VALUES ('${regEmployeeUsername}', 'Employee',${req.session.COMPANYID},'${regEmployeePassword}')`;           
            const result2 = await connection.execute(query2,[], {autoCommit:true});
            const query3 = `INSERT INTO EMPLOYEE_INFO (EMPLOYEE_ID,BRANCH_ID,COMPANY_ID,EMPLOYEE_NAME,SALARY) VALUES ('${regEmployeeUsername}', ${req.session.BRANCHID},${req.session.COMPANYID},'${EmployeeName}',${salary})`;           
            const result3 = await connection.execute(query3,[], {autoCommit:true});
 
            var query4=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID}`;
            var result4 = await connection.execute(query4,[], {autoCommit:true});
            var query5 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result5 = await connection.execute(query5,[], {autoCommit:true});   

            res.render("branch",{branch_info:result4.rows,company:result5.rows[0][0],error : "Registration Done"}); 
            console.log('Registration Done');  
        } 
        else {  
            var query4=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID}`;
            var result4 = await connection.execute(query4,[], {autoCommit:true});
            var query5 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result5 = await connection.execute(query5,[], {autoCommit:true});   

            res.render("branch",{branch_info:result4.rows,company:result5.rows[0][0],error : "Username Already exist<br>Log in if it is you"}); 
            console.log('Username Already exist');
           
            // res.render("branch", {error : "Username Already exist<br>Log in if it is you"});
             
        } 
    }
    else if(temporary=="addCategory")
    {
        var result=await connection.execute(`SELECT * FROM PRODUCT_CATEGORY WHERE Category_ID = '${Category}' AND BRANCH_ID=${req.session.BRANCHID} AND COMPANY_ID=${req.session.COMPANYID}`);
        console.log(Category,ProductName,per_unit_Price,Quantity,Color,Size,Discount,temporary);
     
        if (result.rows.length === 0){ 
  
            // username_already_exist_or_not=1;
            var query2 = `INSERT INTO PRODUCT_CATEGORY (CATEGORY_ID, BRANCH_ID,COMPANY_ID) VALUES ('${Category}', ${req.session.BRANCHID},${req.session.COMPANYID})`;           
            var result2 = await connection.execute(query2,[], {autoCommit:true});
            // const query3 = `INSERT INTO EMPLOYEE_INFO (EMPLOYEE_ID,BRANCH_ID,COMPANY_ID,EMPLOYEE_NAME,SALARY) VALUES ('${regEmployeeUsername}', ${req.session.BRANCHID},${req.session.COMPANYID},'${EmployeeName}',${salary})`;           
            // const result3 = await connection.execute(query3,[], {autoCommit:true});
 
            // var query4=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID}`;
            // var result4 = await connection.execute(query4,[], {autoCommit:true});
            // var query5 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            // var result5 = await connection.execute(query5,[], {autoCommit:true});   

            // res.render("branch",{branch_info:result4.rows,company:result5.rows[0][0],error : "Category Added"}); 
            // console.log('Category Added');  
        } 
        // else {   
        //     var query4=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID}`;
        //     var result4 = await connection.execute(query4,[], {autoCommit:true});
        //     var query5 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
        //     var result5 = await connection.execute(query5,[], {autoCommit:true});   

        //     res.render("branch",{branch_info:result4.rows,company:result5.rows[0][0],error : "Category Already exist"}); 
        //     console.log('Category Already exist');
           
        //     // res.render("branch", {error : "Username Already exist<br>Log in if it is you"});
             
        // }   
 
        const result1=await connection.execute(`SELECT * FROM PRODUCT_INFO WHERE PRODUCT_ID = '${ProductName}' AND BRANCH_ID=${req.session.BRANCHID} AND COMPANY_ID=${req.session.COMPANYID}`);
        // console.log(Category,ProductName,per_unit_Price,Quantity,Color,Size,Discount,temporary);
     
        if (result1.rows.length === 0){ 
  
            // username_already_exist_or_not=1;
            var query2 = `INSERT INTO PRODUCT_INFO (PRODUCT_ID,BRANCH_ID,COMPANY_ID,CATEGORY_ID,UNIT_PRICE,QUANTITY,COLOR,PRODUCT_SIZE,DISCOUNT) VALUES ('${ProductName}', ${req.session.BRANCHID},${req.session.COMPANYID},'${Category}',${per_unit_Price},0,'${Color}','${Size}',${Discount})`;    // initially supplier is null and quantity =0          
            var result2 = await connection.execute(query2,[], {autoCommit:true});
            // const query3 = `INSERT INTO EMPLOYEE_INFO (EMPLOYEE_ID,BRANCH_ID,COMPANY_ID,EMPLOYEE_NAME,SALARY) VALUES ('${regEmployeeUsername}', ${req.session.BRANCHID},${req.session.COMPANYID},'${EmployeeName}',${salary})`;           
            // const result3 = await connection.execute(query3,[], {autoCommit:true});
  
            // var query4=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID}`;
            // var result4 = await connection.execute(query4,[], {autoCommit:true});
            // var query5 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            // var result5 = await connection.execute(query5,[], {autoCommit:true});   

            // res.render("branch",{branch_info:result4.rows,company:result5.rows[0][0],error : "Category Added"}); 
            // console.log('Category Added');  
        } 

        const result_x=await connection.execute(`SELECT CATEGORY_ID FROM PRODUCT_INFO WHERE PRODUCT_ID = '${ProductName}' AND BRANCH_ID=${req.session.BRANCHID} AND COMPANY_ID=${req.session.COMPANYID}`);
        if(result_x.rows[0][0]==Category)
        {
            // var tem_query1 = `SELECT COUNT(*) order_number FROM BUY_ORDER`;  

            // var tem_query1 = `SELECT NVL(MAX(buy_order_id),0) FROM BUY_ORDER`; 
            // function
            var tem_query1 = `SELECT GET_MAX_BUY_ORDER_ID() FROM dual`; 
            var tem_result1 = await connection.execute(tem_query1,[], {autoCommit:true});

            var order_number=tem_result1.rows[0][0];  
            console.log(order_number);
            // var order_id=

            var query_formanagerid = `SELECT MANAGER_ID FROM BRANCH_INFO WHERE BRANCH_ID= ${req.session.BRANCHID}`;           
            var res_formanagerid = await connection.execute(query_formanagerid,[], {autoCommit:true});
            var manager_idd=res_formanagerid.rows[0][0];

            var query_forinsertinto_buyorder=`INSERT INTO BUY_ORDER VALUES(${order_number+1},'${ProductName}','${manager_idd}','${Category}',SYSDATE,${Quantity})`;
            var res_forinsertinto_buyorder = await connection.execute(query_forinsertinto_buyorder,[], {autoCommit:true});

            
            
            var query4=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID}`;
            var result4 = await connection.execute(query4,[], {autoCommit:true});
            var query5 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result5 = await connection.execute(query5,[], {autoCommit:true});   

            res.render("branch",{branch_info:result4.rows,company:result5.rows[0][0],error : "Request Sent to Supplier"}); 
            console.log('Request Sent to Supplier');
        }
        else
        {
            var query4=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID}`;
            var result4 = await connection.execute(query4,[], {autoCommit:true});
            var query5 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result5 = await connection.execute(query5,[], {autoCommit:true});   

            res.render("branch",{branch_info:result4.rows,company:result5.rows[0][0],error : "Wrong Product Category"}); 
            console.log('Wrong Product Category');
        }


        

 
    } 
    else if(temporary=="deleteProduct")
    {
        console.log(ProductName_d,temporary);

        var query_1=`DELETE 
        FROM BUY_ORDER
        WHERE PRODUCT_ID='${ProductName_d}'
        AND MANAGER_ID=(
            SELECT MANAGER_ID
            FROM MANAGER_INFO
            WHERE BRANCH_ID=${req.session.BRANCHID}
        )`;
        var result_1 = await connection.execute(query_1,[], {autoCommit:true});


        var query_2=`DELETE 
        FROM ORDER_DETAILS
        WHERE PRODUCT_ID='${ProductName_d}'
        AND BRANCH_ID=${req.session.BRANCHID}
        AND COMPANY_ID=${req.session.COMPANYID}`;
        var result_2 = await connection.execute(query_2,[], {autoCommit:true});

        var query_3=`DELETE 
        FROM PRODUCT_INFO
        WHERE PRODUCT_ID='${ProductName_d}'
        AND BRANCH_ID=${req.session.BRANCHID}
        AND COMPANY_ID=${req.session.COMPANYID}`;
        var result_3 = await connection.execute(query_3,[], {autoCommit:true});

        var query4=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID}`;
        var result4 = await connection.execute(query4,[], {autoCommit:true});
        var query5 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
        var result5 = await connection.execute(query5,[], {autoCommit:true});   

        res.render("branch",{branch_info:result4.rows,company:result5.rows[0][0],error : "Product Deleted"}); 
        console.log('Product Deleted');
    }
    else if(temporary=="back") 
    {
        console.log("BACK");
    }
     
     
    // if (username === 'zisan' && password === 'zisan') {
    //     res.redirect("/company");
    // } else {
    //     res.render("logIn",{error : "Invalid username or password!"});
        
    // } 
});
   
module.exports= router;      