const oracle = require("oracledb");



async function getallSellinfo(req,res){

    var query=`SELECT S.PRODUCT_ID,S.CATEGORY_ID,B.LOCATION_NAME,S.SELL_QUANTITY,S.SELL_DATE
    FROM SELL_INFO S JOIN BRANCH_INFO B
    ON S.BRANCH_ID=B.BRANCH_ID
    WHERE S.COMPANY_ID=${req.session.COMPANYID}`;
    var result = await connection.execute(query,[], {autoCommit:true});
    var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
    var result1 = await connection.execute(query1,[], {autoCommit:true});   

    res.render("allbranchsellinfo",{order_request:result.rows,company:result1.rows[0][0]});
                
}

module.exports={
    getallSellinfo
}