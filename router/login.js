var express=require("express")
var path=require("path")
var md5=require("md5")
var router=express.Router()
var authenticateMethods=require(path.resolve(__dirname+"/../modules/authenticate.js"))
router.get("/login",function(req,rep,next){
  authenticateMethods.isLogin(req,function(err,result){
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
  account=req.body.name.trim()
  password=md5(req.body.password.trim())
  authenticateMethods.authenticateAccount(account,password,function(err,result){
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
  authenticateMethods.isLogin(req,function(err,result){
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




module.exports=router