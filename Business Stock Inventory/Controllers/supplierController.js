const oracle = require("oracledb");



async function getSupplier(req,res){
    // res.send("lkjh");
    // res.render("branch");
   
    // var query=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID}`;
    var query=`SELECT b.BUY_ORDER_ID,b.PRODUCT_ID,b.CATEGORY_ID,bb.LOCATION_NAME,b.BUY_ORDER_DATE,b.BUY_QUANTITY
    FROM BUY_ORDER b JOIN BRANCH_INFO bb 
    on b.MANAGER_ID=bb.MANAGER_ID
    WHERE b.BUY_QUANTITY>0 AND bb.COMPANY_ID=${req.session.COMPANYID}`;
    var result = await connection.execute(query,[], {autoCommit:true});
    var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
    var result1 = await connection.execute(query1,[], {autoCommit:true});   

    res.render("supplier",{order_request:result.rows,company:result1.rows[0][0]});
                // await connection.execute(
                //     query,[],{autoCommit:true},(e,result)=>{
                //         if(e)console.log(e);
                //         res.render("branch",{branches:result.rows});
                //     }
                // )
    // oracle.getConnection(
    //     {
    //         user: "BusinessInventory",
    //         password:"91109",
    //         connectString: "localhost:1521/orcl",
    //     },(err,con)=>{
    //         if(err)console.log("connection error");
    //         else{
    //             var query="select * from Branch_Info"
    //             con.execute(
    //                 query,[],{autoCommit:true},(e,result)=>{
    //                     if(e)console.log(e);
    //                     res.render("branch",{branches:result.rows});
    //                 }
    //             )
    //         }
    //     }
    // )
}

module.exports={
    getSupplier
}