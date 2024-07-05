const oracle=require("oracledb");

async function connectToDB(){
    connection=await oracle.getConnection(
        {
            user: "BusinessInventory", 
            password:"91109",
            connectString: "localhost:1521/orcl",
        }
    );
    return connection;
}

module.exports={
    connectToDB
}