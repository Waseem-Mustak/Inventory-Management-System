const oracle = require("oracledb");



async function getProduct(req,res){
    // res.send("lkjh");
    // res.render("branch");
    var query=`select * from Product_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID} AND CATEGORY_ID= '${req.session.CATEGORYID}'`;
    var result = await connection.execute(query,[], {autoCommit:true});
    var query1 = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
    var result1 = await connection.execute(query1,[], {autoCommit:true});   

    res.render("product",{products:result.rows,company:result1.rows[0][0]}); 
    // var query=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID} AND BRANCH_ID= ${req.session.BRANCHID}`;
    //             await connection.execute(
    //                 query,[],{autoCommit:true},(e,result)=>{
    //                     if(e)console.log(e);
    //                     res.render("branch",{branches:result.rows});
    //                 }
    //             )
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
    getProduct
}