
const express = require("express");
 
const router = express.Router(); 

const {getLogIn} = require("../Controllers/logInController");
  
router.get("/", getLogIn);

router.post("/",async function(req , res){   
    var username = req.body.username;  
    var password = req.body.password;   
    var regUsername = req.body.regUsername;   
    var regPassword = req.body.regPassword; 
    // var ownerId = req.body.ownerId;   
    var ownerName = req.body.ownerName;
    var companyName = req.body.companyName;
    var companyId = req.body.companyId;
    var ownerId=companyId;
    
    var regCustomerUsername = req.body.regCustomerUsername;
    var regCustomerPassword = req.body.regCustomerPassword;
    var companyId_Customer = req.body.companyId_Customer;
    var CustomerName = req.body.CustomerName;

     
    var temporary=req.body.action;    

    console.log(username,password,regUsername,regPassword,ownerId,ownerName,companyId,companyName,temporary);
    if(temporary=="login-user")  
    {  
          
     
        // run query in user_info by this username 
        const result=await connection.execute(`SELECT * FROM USER_INFO WHERE USER_ID = '${username}'`);
        //console.log(username,password);
    
        if (result.rows.length === 0){
            console.log('wrong username');
            res.render("logIn", {error : "Username Does Not Exist!"});  
        }    
        else {  
            //initial some global variable  
            
            var correct_password = result.rows[0][3];  
            console.log("Pass: ",correct_password); 
            if (password === correct_password){   


                req.session.USERNAME=username;
                req.session.USERTYPE=result.rows[0][1];
                req.session.COMPANYID=result.rows[0][2];
                if(req.session.USERTYPE=='Owner')res.redirect("/company");
                if(req.session.USERTYPE=='Manager')
                {
                    var result_1=await connection.execute(`SELECT BRANCH_ID FROM MANAGER_INFO WHERE MANAGER_ID = '${username}'`);
                    req.session.BRANCHID=result_1.rows[0][0];
                    res.redirect("/branch");

                }
                if(req.session.USERTYPE=='Customer')
                {
                    // var result_1=await connection.execute(`SELECT BRANCH_ID FROM MANAGER_INFO WHERE MANAGER_ID = '${username}'`);
                    // req.session.BRANCHID=result_1.rows[0][0];
                    res.redirect("/branch_table");

                }
                if(req.session.USERTYPE=='Supplier')
                {
                    // var result_1=await connection.execute(`SELECT BRANCH_ID FROM MANAGER_INFO WHERE MANAGER_ID = '${username}'`);
                    // req.session.BRANCHID=result_1.rows[0][0];
                    res.redirect("/supplier");

                }
                if(req.session.USERTYPE=='Employee')
                {
                    
                    res.redirect("/employee");
                }
                // req.session.CURRENT_USER = username;  
                // req.session.CURRENT_CATEGORY = result.rows[0][1];
                //console.log('successful ' + req.session.CURRENT_USER); 
            }
            else{
                res.render("logIn", {error : "Wrong Password!"});
                console.log('wrong password');
            }
        }

        // if (username === 'buet' && password === 'buet1') {
        //     res.redirect("/buet");
        // } else {
        //     res.render("login",{error : "Invalid username or password!"});
            
        // } 
    }
    else if(temporary=="reg-user")
    {
        // registration_on=1;
        console.log("KJHGFD");
        // run query in user_info by this username 
        const result=await connection.execute(`SELECT password FROM USER_INFO WHERE USER_ID = '${regUsername}'`);
        const result_tem=await connection.execute(`SELECT * FROM COMPANY_INFO WHERE COMPANY_ID=${companyId}`);
        

        //console.log(username,password);
     
        if (result.rows.length === 0){ 
            if(result_tem.rows.length===0)
            {
                username_already_exist_or_not=1;
                const query = `INSERT INTO OWNER_INFO (OWNER_ID, COMPANY_ID,OWNER_NAME) VALUES (${ownerId}, ${companyId},'${ownerName}')`;           
                const result = await connection.execute(query,[], {autoCommit:true});

                const query1 = `INSERT INTO COMPANY_INFO (COMPANY_ID,OWNER_ID, COMPANY_NAME) VALUES (${companyId}, ${ownerId},'${companyName}')`;           
                const result1 = await connection.execute(query1,[], {autoCommit:true});

                const query2 = `INSERT INTO USER_INFO (USER_ID, USER_TYPE,COMPANY_ID,PASSWORD) VALUES ('${regUsername}', 'Owner',${companyId},'${regPassword}')`;           
                const result2 = await connection.execute(query2,[], {autoCommit:true});
                res.render("logIn", {error : "Registration Completed"});  
            }
            else {  
                console.log('ComapnyId Already exist');
               
                res.render("logIn", {error : "ComapnyId Already exist<br>Log in if it is you"});
                 
            } 
        } 
        else {  
            console.log('Username Already exist');
           
            res.render("logIn", {error : "Username Already exist<br>Log in if it is you"});
             
        } 
 
    } 
    else if(temporary=="reg-customer-user")
    {
        console.log(regCustomerUsername,regCustomerPassword,companyId_Customer,CustomerName,temporary);
        // registration_on=1;
        console.log("KJHGFD");
        // run query in user_info by this username 
        const result=await connection.execute(`SELECT password FROM USER_INFO WHERE USER_ID = '${regCustomerUsername}'`);
        const result_tem=await connection.execute(`SELECT * FROM COMPANY_INFO WHERE COMPANY_ID=${companyId_Customer}`);

        //console.log(username,password);
     
        if (result.rows.length === 0){ 
            if(result_tem.rows.length===0)
            {
                console.log('Invalid CompanyId');
                res.render("logIn", {error : "Invalid CompanyId"});
            }
            else
            {

                const query2 = `INSERT INTO USER_INFO (USER_ID, USER_TYPE,COMPANY_ID,PASSWORD) VALUES ('${regCustomerUsername}', 'Customer',${companyId_Customer},'${regCustomerPassword}')`;           
                const result2 = await connection.execute(query2,[], {autoCommit:true});
                const query3 = `INSERT INTO CUSTOMER_INFO (CUSTOMER_ID,COMPANY_ID,CUSTOMER_NAME) VALUES ('${regCustomerUsername}', ${companyId_Customer},'${CustomerName}')`;           
                const result3 = await connection.execute(query3,[], {autoCommit:true});

                // console.log(`${result.rowsAffected} row(s) inserted.`); 
                // var query=`INSERT INTO USER_INFO (username,password) values(:user,:pass)`;
                    // registration_on=0; 
                //     // const bindVariableValue = "fihad_1";  
                //     const binds={ 
                //         user: username,
                //         pass: password 
                //     } 
                //     await connection.execute(
                //         query,binds,{autoCommit:true},(e,result)=>{
                //             if(e)console.log(e); 
                //             console.log("janina ki hoilo");
                //             // res.render("login",{departments:result.rows});

                //         } 
                //     )   
                // await connection.execute(query);    
                // console.log('wrong username');  
                res.render("logIn", {error : "Registration Completed"});  
            }
        } 
        else {  
            console.log('Username Already exist for customer');
           
            res.render("logIn", {error : "Username Already exist<br>Log in if it is you"});
             
        } 

        // if (username === 'buet' && password === 'buet1') {
        //     res.redirect("/buet");
        // } else {
        //     res.render("login",{error : "Invalid username or password!"});
             
        // }
        // res.render("logIn", {error : "Vallagena"});
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
  
module.exports = router ;


// const router= express

// const {getLogin}=require("../Controllers/logInController");

// router.get("/",getLogin);

// module.exports=router;