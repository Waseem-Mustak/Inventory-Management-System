


const express = require("express");
 
const router = express.Router();

const {getCompany} = require("../Controllers/companyController");

router.get("/", getCompany);  

router.post("/",async function(req , res){ 
    // console.log("hehe");  
    const selectedValue = req.body.selectedValue;
    console.log('Received selected valueeee:', selectedValue);
    
    // You can perform further processing with the selected value here
    
    // res.json({ message: 'Received and processed selected value' });
    // var dropdown_box_value = req.body.dropdown_box_value; 
    // var password = req.body.password; 
    // var regUsername = req.body.regUsername;    
    // var regPassword = req.body.regPassword;
    // var ownerId = req.body.ownerId; 
    // var ownerName = req.body.ownerName;
    // var companyName = req.body.companyName;
    // var companyId = req.body.companyId;  
     
    var temporary=req.body.action;  

    // console.log(dropdown_box_value,temporary);
    if(temporary=="add-branch")
    {
        var managerUsername = req.body.managerUsername;  
        var managerPassword = req.body.managerPassword; 
        var managerName = req.body.managerName;   
        var branchLocation = req.body.branchLocation;  
        var managerSalary = req.body.managerSalary;  
        
        
        const result=await connection.execute(`SELECT password FROM USER_INFO WHERE USER_ID = '${managerUsername}'`);
        //console.log(username,password);
     
        if (result.rows.length === 0){  
            var query3 = `INSERT INTO USER_INFO (USER_ID, USER_TYPE,COMPANY_ID,PASSWORD) VALUES ('${managerUsername}', 'Manager',${req.session.COMPANYID},'${managerPassword}')`;           
            var result3 = await connection.execute(query3,[], {autoCommit:true});
 
            //branch number
            console.log(managerUsername,managerPassword,managerName,branchLocation,managerSalary);
            var tem_query1 = `SELECT COUNT(*) branch_number FROM BRANCH_INFO`;           
            var tem_result1 = await connection.execute(tem_query1,[], {autoCommit:true});
            var branch_number=tem_result1.rows[0][0];
            console.log(branch_number);

            var query1 = `INSERT INTO BRANCH_INFO (BRANCH_ID, COMPANY_ID,MANAGER_ID,LOCATION_NAME) VALUES (${branch_number+1}, ${req.session.COMPANYID},'${managerUsername}','${branchLocation}')`;           
            var result1 = await connection.execute(query1,[], {autoCommit:true});

            var query2 = `INSERT INTO MANAGER_INFO (MANAGER_ID,BRANCH_ID,COMPANY_ID, MANAGER_NAME,SALARY) VALUES ('${managerUsername}', ${branch_number+1},${req.session.COMPANYID},'${managerName}',${managerSalary})`;           
            var result2 = await connection.execute(query2,[], {autoCommit:true});

              
            var query4 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result4 = await connection.execute(query4,[], {autoCommit:true});
            var query5 = `SELECT LOCATION_NAME,BRANCH_ID FROM BRANCH_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result5 = await connection.execute(query5,[], {autoCommit:true}); 


            // queries for inserting values in user_info,branch_info,manager_info

            console.log(result4.rows[0][0]);
            res.render("company",{company:result4.rows[0][0],branches:result5.rows,error : "Added New Branch Successfully"}); 
            console.log("Added New Branch Successfully");
        }  
        else {  
            var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result1 = await connection.execute(query1,[], {autoCommit:true});
            var query2 = `SELECT LOCATION_NAME,BRANCH_ID FROM BRANCH_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result2 = await connection.execute(query2,[], {autoCommit:true});
 

            // queries for inserting values in user_info,branch_info,manager_info

            console.log(result1.rows[0][0]);
            res.render("company",{company:result1.rows[0][0],branches:result2.rows,error : "Username Already exist"}); 
            console.log('Username Already exist');
           
            // res.render("logIn", {error : "Username Already exist<br>Log in if it is you"});
             
        }
        
    }
    else if(temporary=="dropdown_value_submit")  
    {

        req.session.BRANCHID=selectedValue;
        console.log("DONE ",req.session.BRANCHID);
        const shouldNavigate=true; 
        res.json({ shouldNavigate }); 
        
    }
    else if(temporary=="add-supplier")
    {
        var supplierUsername = req.body.supplierUsername;  
        var supplierPassword = req.body.supplierPassword; 
        var supplierName = req.body.supplierName;    
         
         
        const result=await connection.execute(`SELECT password FROM USER_INFO WHERE USER_ID = '${supplierUsername}'`);
        console.log(supplierUsername,supplierPassword,supplierName,temporary);
     
        if (result.rows.length === 0){ 
            var query3 = `INSERT INTO USER_INFO (USER_ID, USER_TYPE,COMPANY_ID,PASSWORD) VALUES ('${supplierUsername}', 'Supplier',${req.session.COMPANYID},'${supplierPassword}')`;           
            var result3 = await connection.execute(query3,[], {autoCommit:true});
 
            //branch number
            // console.log(managerUsername,managerPassword,managerName,branchLocation,managerSalary);
            // var tem_query1 = `SELECT COUNT(*) branch_number FROM BRANCH_INFO`;           
            // var tem_result1 = await connection.execute(tem_query1,[], {autoCommit:true});
            // var branch_number=tem_result1.rows[0][0];
            // console.log(branch_number);

            // var query1 = `INSERT INTO BRANCH_INFO (BRANCH_ID, COMPANY_ID,MANAGER_ID,LOCATION_NAME) VALUES (${branch_number+1}, ${req.session.COMPANYID},'${managerUsername}','${branchLocation}')`;           
            // var result1 = await connection.execute(query1,[], {autoCommit:true});

            var query2 = `INSERT INTO SUPPLIER_INFO (SUPPLIER_ID,COMPANY_ID, SUPPLIER_NAME) VALUES ('${supplierUsername}',${req.session.COMPANYID},'${supplierName}')`;           
            var result2 = await connection.execute(query2,[], {autoCommit:true});

              
            var query4 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result4 = await connection.execute(query4,[], {autoCommit:true});
            var query5 = `SELECT LOCATION_NAME,BRANCH_ID FROM BRANCH_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result5 = await connection.execute(query5,[], {autoCommit:true}); 


            // queries for inserting values in user_info,branch_info,manager_info

            console.log(result4.rows[0][0]);
            res.render("company",{company:result4.rows[0][0],branches:result5.rows,error : "Added New Supplier Successfully"}); 
            console.log("Added New Supplier Successfully");
        }  
        else {  
            var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result1 = await connection.execute(query1,[], {autoCommit:true});
            var query2 = `SELECT LOCATION_NAME,BRANCH_ID FROM BRANCH_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
            var result2 = await connection.execute(query2,[], {autoCommit:true});
 

            // queries for inserting values in user_info,branch_info,manager_info

            console.log(result1.rows[0][0]);
            res.render("company",{company:result1.rows[0][0],branches:result2.rows,error : "Username Already exist"}); 
            console.log('Username Already exist');
           
            // res.render("logIn", {error : "Username Already exist<br>Log in if it is you"});
             
        }

    } 
    else if(temporary=="back")
    {
        // console.log("BACK");
    }
    
    
    // if (username === 'zisan' && password === 'zisan') {
    //     res.redirect("/company");
    // } else {
    //     res.render("logIn",{error : "Invalid username or password!"});
        
    // } 
});


module.exports= router;