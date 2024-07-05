const oracle = require("oracledb");



async function getSellinfo(req,res){

    var query=`SELECT * FROM SELL_INFO
    WHERE BRANCH_ID=${req.session.BRANCHID}
    AND COMPANY_ID=${req.session.COMPANYID}`;
    var result = await connection.execute(query,[], {autoCommit:true});
    var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
    var result1 = await connection.execute(query1,[], {autoCommit:true});   

    res.render("sellinfo",{order_request:result.rows,company:result1.rows[0][0]});
                
}

module.exports={
    getSellinfo
}