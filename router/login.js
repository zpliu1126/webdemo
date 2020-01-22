var express=require("express")
var path=require("path")
var md5=require("md5")
var errorCategory=require(path.resolve(__dirname+"/../include/error.js"))
var router=express.Router()
var poolConnection=require(path.resolve(__dirname+"/../include/mysql_config.js")).poolConnection

router.get("/login",function(req,rep,next){
  isLogin(req,function(err,result){
    if(err){
      next(err)
      return
    }
    if(result==0){ //cookie修改之后resule为空也需要重新登录
      rep.render("login.html")
      return
    }
    rep.redirect("/profile?"+req.cookies.account.name)
  })
})
/*login Verification*/
router.post("/login",function(req,rep,next){
  account=req.body.name
  password=md5(req.body.password)
  authenticateAccount(account,password,function(err,result){
    if(err){
     next(err)
     return ;
    }
    if(result!=false){
      rep.cookie("account",{name:result[0].name,password:result[0].password},{maxAge:86400000*7})
      rep.redirect("/profile?"+result[0].name)
    }
    else{
      rep.send("account or password error!")
    }
  })
})

router.get("/profile",function(req,rep,next){
    isLogin(req,function(err,result){
      if(err){
        next(err)
        return
      }
      if(result==0){ //cookie修改之后resule为空也需要重新登录
        rep.redirect("/login")
        return
      }
      rep.render("profile.html",{user:req.cookies.account.name})
    })
})

router.get("/logout",function(req,rep,next){
  rep.clearCookie("account")
  rep.redirect("/")
})

/*some methods to process authenticate login and logout */
function authenticateAccount(account,password,callback){
  poolConnection.getConnection(function(err,connection){
    if(err){
      callback(errorCategory.mysql.connection) //error category
      return ;
    }
    //verification
    sql='SELECT * FROM `user` WHERE `name`=? and `password`=?'
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
  authenticateAccount(req.cookies.account.name,req.cookies.account.password,callback)
}


module.exports=router