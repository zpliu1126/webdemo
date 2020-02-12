var express=require("express")
var path=require("path")
var md5=require("md5")
var router=express.Router()
var registerMethods=require(path.resolve(__dirname+"/../modules/register.js"))

router.get("/teacher",function(req,rep){
      registerMethods.getTeacher(function(err,data){
        if(err){
          rep.json(err)
          return
        }
        rep.json(data)
      })
})
router.post("/register",function(req,rep){
      registerMethods.addAccount(req.body,function(err,data){
        if(err){
          rep.json(err)
          return
        }
        //设置cookie
        let chineseName=escape(req.body.chineseName)
        let teacherName=escape(req.body.teacher_name)
        rep.cookie(
          "account",'{\"name\":'+'\"'+req.body.name+'\"'+',\"password\":'+'\"'+req.body.password+'\"'+'}',
          {
            maxAge:86400000*7,
          }
        )
        rep.cookie("chineseName",chineseName,{
          maxAge:86400000*7,
        })
        rep.cookie("teacherName",teacherName,{
          maxAge:86400000*7,
        })
        rep.cookie("userId",data.insertId,{
          maxAge:86400000*7,
        })
        rep.cookie("islogin",1,{
          maxAge:86400000*7,
        })
        rep.json({"register":1})
        return
      })
})


module.exports=router