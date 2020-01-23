var express=require("express")
var path=require("path")
var url=require("url") //处理get请求参数
var router=express.Router()
var errorCategory=require(path.resolve(__dirname,"./../include/error.js"))
var authenticateMethods=require(path.resolve(__dirname+"/../modules/authenticate.js"))
var primerDataMethods=require(path.resolve(__dirname+"/../modules/primerData.js"))

/*首页关键字查询*/
router.post("/",function(req,rep,next){
  keyword=req.body.keyword;
  primerDataMethods.searchByKeyword(keyword,function(err,result){
    if(err){
      next(err)
      return
    }
    rep.send(result)
  })
})

/* 数据插入 */
router.post("/insert",function(req,rep,next){
  authenticateMethods.isLogin(req,function(err,result){
    if(err){
      next(err)
      return
    }
    if(result==0){ //cookie修改之后resule为空也需要重新登录
      rep.redirect("/login")
      return
    }
    if(primerDataMethods.checkInsertData(req.body)){
      primerDataMethods.insertItem(primerDataMethods.checkInsertData(req.body),function(err,result){
        if(err && err.sqlState=="23000"){
          rep.send(err.sqlMessage) //mysql自带错误,由于重复插入；不需要跳转到错误中间件
          return
        }else if(err){
          next(errorCategory.mysql.sql)
          return
        }
        rep.send("插入成功")
      })
    }else{
      next(errorCategory.mysql.requireFields)
      return
    }
  })
})
/* 根据订单号更新数据 */
router.post("/update",function(req,rep,next){
  authenticateMethods.isLogin(req,function(err,result){
    if(err){
      next(err)
      return
    }
    if(result==0){ //cookie修改之后resule为空也需要重新登录
      rep.redirect("/login")
      return
    }
    if(primerDataMethods.checkInsertData(req.body)){
      primerDataMethods.updateByOne(primerDataMethods.checkInsertData(req.body),function(err,data){
          if(err){
            rep.send(err)
            return
          }else{
            rep.send("更新成功")
          } 
        })
    }else{
      next(errorCategory.requireFields)
      return
    }
  })
})
/* 根据get请求得到的订单号，删除数据 */
router.get("/delete",function(req,rep,next){
  keyword=url.parse(req.url,true).query["keyword"] //解析get参数
  authenticateMethods.isLogin(req,function(err,result){
    if(err){
      next(err)
      return
    }
    if(result==0){ //cookie修改之后resule为空也需要重新登录
      rep.redirect("/login")
      return
    }
    primerDataMethods.deleteByOne(keyword,function(err){
      if(err){
        rep.send(err)
        return
      }
      rep.status(304).redirect("/profile")
    })
  })
})

module.exports=router