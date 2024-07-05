const oracle = require("oracledb");



async function getEmployee(req,res){

    //prev
    // var query_ = `SELECT BRANCH_ID FROM EMPLOYEE_INFO WHERE EMPLOYEE_ID= '${req.session.USERNAME}'`;           
    // var result_ = await connection.execute(query_,[], {autoCommit:true});
    // var branch_idd=result_.rows[0][0];   
    // branch_idd=Number(branch_idd);

    // var query = `SELECT * FROM ORDER_DETAILS WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${branch_idd} AND PRODUCT_STATUS='Received'`;           
    // var result = await connection.execute(query,[], {autoCommit:true});  
    var query=" ";
    if(req.session.USERTYPE=='Employee') 
    {
        query = `SELECT * 
        FROM ORDER_DETAILS 
        WHERE 
        COMPANY_ID= ${req.session.COMPANYID} AND 
        BRANCH_ID=(select branch_id from EMPLOYEE_INFO where EMPLOYEE_ID='${req.session.USERNAME}') AND 
        PRODUCT_STATUS='Received'`;     
    }
    else
    {
        query = `SELECT * 
        FROM ORDER_DETAILS 
        WHERE 
        COMPANY_ID= ${req.session.COMPANYID} AND 
        BRANCH_ID= ${req.session.BRANCHID} AND 
        PRODUCT_STATUS='Received'`;    
    }
 
    // var query = `SELECT * 
    // FROM ORDER_DETAILS 
    // WHERE 
    // COMPANY_ID= ${req.session.COMPANYID} AND 
    // BRANCH_ID=(select branch_id from EMPLOYEE_INFO where EMPLOYEE_ID='${req.session.USERNAME}') AND 
    // PRODUCT_STATUS='Received'`;           
    var result = await connection.execute(query,[], {autoCommit:true});   


    

    // console.log(req.session.COMPANYID,branch_idd);
    var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
    var result1 = await connection.execute(query1,[], {autoCommit:true});   
    console.log(result.rows.length);
    res.render("employee",{order_details:result.rows,company:result1.rows[0][0]});
}

module.exports={
    getEmployee
}