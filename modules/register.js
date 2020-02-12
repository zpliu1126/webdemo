var path=require("path")
var errorCategory=require(path.resolve(__dirname+"/../include/error.js"))
var poolConnection=require(path.resolve(__dirname+"/../include/mysql_config.js")).poolConnection

function getTeacher(callback){
  poolConnection.getConnection(function(err,connection){
    if(err){
      callback(errorCategory.mysql.connection) //error category
      return ;
    }
    //verification
    sql='SELECT * FROM `teacher`'
    connection.query(sql,function(err,result,fields){
      if(err){
        callback(errorCategory.mysql.sql)
        return ;
      }
      connection.release();
      callback(null,result)
    })
  })
}
function addAccount(body,callback){
  body.teacherId=parseInt(body.teacherId)
  poolConnection.getConnection(function(err,connection){
    if(err){
      callback(errorCategory.mysql.connection)//error category
      return ;
    }
  sql=`INSERT INTO user(name,password,chineseName,teacherID) VALUES("${body.name}",md5("${body.password}"),"${body.chineseName}",${body.teacherId})`
  connection.query(sql,function(err,result,fields){
    if(err && err.errno==1062){
      callback(errorCategory.mysql.Duplicateaccount); //error category
      return ;
    }
    connection.release();
    callback(null,result)
  })
  })
}


module.exports={
  getTeacher,
  addAccount,
}