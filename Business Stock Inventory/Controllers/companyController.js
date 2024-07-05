async function getCompany(req,res){
    // res.send("lkjh");
    // console.log(process.env.COMPANYID);
    const query = `SELECT COMPANY_NAME FROM COMPANY_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
    const result = await connection.execute(query,[], {autoCommit:true});
    const query1 = `SELECT LOCATION_NAME,BRANCH_ID FROM BRANCH_INFO WHERE COMPANY_ID= ${req.session.COMPANYID}`;           
    const result1 = await connection.execute(query1,[], {autoCommit:true});
    console.log(result.rows[0][0]);
    res.render("company",{company:result.rows[0][0],branches:result1.rows});
}
 
module.exports={    
    getCompany   
} 