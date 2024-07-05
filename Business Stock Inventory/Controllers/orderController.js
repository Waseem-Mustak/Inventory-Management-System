const oracle = require("oracledb");



async function getOrder(req,res){
    // res.send("lkjh");
    // res.render("branch");
    console.log(req.session.COMPANYID,req.session.BRANCHID,req.session.CATEGORYID,req.session.PRODUCTID);
    
    var query=`select * from Product_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID} AND CATEGORY_ID= '${req.session.CATEGORYID}' AND PRODUCT_ID= '${req.session.PRODUCTID}'`;
    var result = await connection.execute(query,[], {autoCommit:true});
    var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
    var result1 = await connection.execute(query1,[], {autoCommit:true});   
    
    res.render("order",{products:result.rows,company:result1.rows[0][0]}); 
     
} 

module.exports={
    getOrder
}