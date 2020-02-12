var express=require("express")
var path=require("path")
var md5=require("md5")
var router=express.Router()
var authenticateMethods=require(path.resolve(__dirname+"/../modules/authenticate.js"))
// 后端渲染取消
// router.get("/login",function(req,rep,next){
//   authenticateMethods.isLogin(req,function(err,result){
//     if(err){
//       next(err)
//       return
//     }
//     if(result==0){ //cookie修改之后resule为空也需要重新登录
//       rep.render("login.html")
//       return
//     }
//     rep.redirect("/primer/profile?"+req.cookies.account.name) //重定向
//   })
// })
/*login Verification*/
router.post("/login",function(req,rep,next){
  account=req.body.name.trim()
  password=md5(req.body.password.trim())
  authenticateMethods.authenticateAccount(account,password,function(err,result){
    if(err){
     rep.json(err) //交给前段路由进行处理
     return ;
    }
    if(result!=false){
      //domain解决反向代理设置cookie问题
      let chineseName=escape(result[0].chineseName)
      let teacherName=escape(result[0].teacher_name)
      rep.cookie(
        "account",'{\"name\":'+'\"'+result[0].name+'\"'+',\"password\":'+'\"'+result[0].password+'\"'+'}',
        {
          maxAge:86400000*7,
        }
      )
      rep.cookie("userId",result[0].id,{
        maxAge:86400000*7,
      })
      rep.cookie("chineseName",chineseName,{
        maxAge:86400000*7,
      })
      rep.cookie("teacherName",teacherName,{
        maxAge:86400000*7,
      })
      rep.cookie("islogin",1,{
        maxAge:86400000*7,
      })
      // rep.redirect("/primer/profile?"+result[0].name)
      rep.json({
        "authenticateThrought":"yes"
      })
    }
    else{
      rep.json({
        "authenticateThrought":"no"
      })
    }
  })
})
/*login Verification*/
// router.get("/profile",function(req,rep,next){
  
//   account=req.cookies.account.name
//   password=req.cookies.account.password
//   console.log(account)
//   if(!account&&!password){
//     console.log("SASA")
   
//     rep.json({"authenticateThrought":"no"});
//     return
//   }
//   authenticateMethods.authenticateAccount(account,password,function(err,result){
//     if(err){
//      rep.json(err) //交给前段路由进行处理
//      return ;
//     }
//     if(result!=false){
//       //使用cookie认证成功
//       rep.json({
//         "authenticateThrought":"yes"
//       })
//       return
//     }
//     else{
//       //cookie认证失败，需要重新登录
//       rep.json({
//         "authenticateThrought":"no"
//       })
//       return
//     }
//   })
// })
router.get("/profile",function(req,rep,next){
  authenticateMethods.isLogin(req,function(err,result){
      if(err){
        next(err)
        return
      }
      if(result==0){ //cookie修改之后resule为空也需要重新登录
        rep.json({
          "authenticateThrought":"no"
        })
        return
      }
      rep.json({
        "authenticateThrought":"yes"
      })
    })
})

// router.get("/logout",function(req,rep,next){
//   rep.clearCookie("account")
//   rep.redirect("/primer")
// })


module.exports=router