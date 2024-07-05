const oracle = require("oracledb");



async function getCustomers_order(req,res){
    // res.send("lkjh");
    // res.render("branch");
   
    // var query=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID}`;
    var query=`SELECT O.ORDER_ID,O.CUSTOMER_ID,O.PRODUCT_ID,O.CATEGORY_ID,B.LOCATION_NAME,O.ORDER_QUANTITY+NVL(S.SELL_QUANTITY, 0),O.PAYMENT_METHOD,O.PRODUCT_STATUS
    FROM ORDER_DETAILS O LEFT OUTER JOIN SELL_INFO S
    ON O.ORDER_ID=S.ORDER_ID
    JOIN BRANCH_INFO B
    ON O.BRANCH_ID=B.BRANCH_ID
    WHERE O.CUSTOMER_ID='${req.session.USERNAME}' AND O.COMPANY_ID=${req.session.COMPANYID}`;
    // var query=`SELECT b.BUY_ORDER_ID,b.PRODUCT_ID,b.CATEGORY_ID,bb.LOCATION_NAME,b.BUY_ORDER_DATE,b.BUY_QUANTITY
    // FROM BUY_ORDER b JOIN BRANCH_INFO bb
    // on b.MANAGER_ID=bb.MANAGER_ID
    // WHERE b.BUY_QUANTITY>0 AND bb.COMPANY_ID=${req.session.COMPANYID}`;
    var result = await connection.execute(query,[], {autoCommit:true});
    var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
    var result1 = await connection.execute(query1,[], {autoCommit:true});   

    res.render("customers_order",{order_request:result.rows,company:result1.rows[0][0]});
}

module.exports={
    getCustomers_order
}