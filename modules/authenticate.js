var path=require("path")
var errorCategory=require(path.resolve(__dirname+"/../include/error.js"))
var poolConnection=require(path.resolve(__dirname+"/../include/mysql_config.js")).poolConnection

/*some methods to process authenticate login and logout */
function authenticateAccount(account,password,callback){
  poolConnection.getConnection(function(err,connection){
    if(err){
      callback(errorCategory.mysql.connection) //error category
      return ;
    }
    //verification
    sql='select user.* ,user.name,teacher.teacher_name from user left join teacher  on user.teacherID=teacher.id WHERE user.name=? and user.password=?'
    connection.query(sql,[account,password],function(err,result,fields){
      if(err){
        callback(errorCategory.mysql.sql) //error category
        return ;
      }
      connection.release();
      callback(null,result)
    })
  })
}

function isLogin(req,callback){
  if(req.cookies.account==null){
    callback(null,0);
    return
  }
  account=JSON.parse(req.cookies.account).name.trim()
  password=JSON.parse(req.cookies.account).password.trim()
  authenticateAccount(account,password,callback)
}
module.exports={
  authenticateAccount,
  isLogin,
}