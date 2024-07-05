const oracle = require("oracledb");



async function getBranchTable(req,res){ 
    // res.send("lkjh");
    // res.render("branch"); 
    // console.log("within branch Controller");
    var query = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
    var result = await connection.execute(query,[], {autoCommit:true});
    var query2=`select * from Branch_Info WHERE COMPANY_ID= ${req.session.COMPANYID} ORDER BY BRANCH_ID ASC`;
    var result2 = await connection.execute(query2,[], {autoCommit:true});       

    res.render("branch_table",{branches:result2.rows,company:result.rows[0][0],userType:req.session.USERTYPE}); 
 
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
    getBranchTable
}