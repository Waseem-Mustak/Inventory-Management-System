const oracle = require("oracledb");



async function getCategory(req,res){
    // res.send("lkjh");
    // res.render("branch");
    var query=`select * from Product_Category WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID}`;
    var result = await connection.execute(query,[], {autoCommit:true});
    var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
    var result1 = await connection.execute(query1,[], {autoCommit:true});   

    res.render("category",{categorys:result.rows,company:result1.rows[0][0]});  
}

module.exports={
    getCategory
}