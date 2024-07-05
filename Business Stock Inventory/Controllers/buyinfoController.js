const oracle = require("oracledb");



async function getBuyinfo(req,res){
    // res.send("lkjh");
    // res.render("branch");
   
    // var query=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID}`;
    var query=`SELECT B.PRODUCT_ID,B.CATEGORY_ID,B.BUY_QUANTITY,B.SUPPLY_DATE,B.SUPPLIER_ID
    FROM BUY_INFO B join BUY_ORDER BB
    ON B.BUY_ORDER_Id=BB.BUY_ORDER_id
    JOIN BRANCH_INFO BBB
    ON BB.MANAGER_ID=BBB.MANAGER_ID
    WHERE BBB.BRANCH_ID=${req.session.BRANCHID}
    AND BBB.COMPANY_ID=${req.session.COMPANYID}`;
    var result = await connection.execute(query,[], {autoCommit:true});
    var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
    var result1 = await connection.execute(query1,[], {autoCommit:true});   

    res.render("buyinfo",{order_request:result.rows,company:result1.rows[0][0]});
                
}

module.exports={
    getBuyinfo
}