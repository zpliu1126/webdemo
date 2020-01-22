var express=require("express")
var path=require("path")
var router=express.Router()
var errorCategory=require(path.resolve(__dirname,"./../include/error.js"))
var poolConnection=require(path.resolve(__dirname+"/../include/mysql_config.js")).poolConnection

router.post("/",function(req,rep,next){
  keyword=req.body.keyword;
  searchByKeyword(keyword,function(err,result){
    if(err){
      next(err)
      return
    }
    rep.send(result)
  })
})

function searchByKeyword(keyword ,callback){
  poolConnection.getConnection(function(err,connection){
    if(err){
      callback(errorCategory.mysql.connection)
      return
    }
    sql=`select * FROM \`primer\` 
    WHERE CONCAT( \`subscriber\`,\`teacher\`,\`company\`,\`2thID\`,\`3thID\`,\`order_number\`) 
    like "%${keyword}%" `
    connection.query(sql,function(err,result){
      if(err){
        callback(errorCategory.mysql.sql)
        return
      }
      connection.release()
      callback(null,result)
    })
  })
}
function insertItem(){
  
}
module.exports=router