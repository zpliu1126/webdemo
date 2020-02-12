var express=require("express")
var multer=require('multer')
var path=require("path")
var url=require("url") //处理get请求参数
var router=express.Router()
var errorCategory=require(path.resolve(__dirname,"./../include/error.js"))
var authenticateMethods=require(path.resolve(__dirname+"/../modules/authenticate.js"))
var primerDataMethods=require(path.resolve(__dirname+"/../modules/primerData.js"))
var uploadPath=multer({dest:path.resolve(__dirname,"./../uploads/")}) //上传文件存储目录
var xlsx=require('node-xlsx') //读取xlsx文件
var fs=require("fs")
/*首页关键字查询*/
router.post("/",function(req,rep,next){
  keyword=req.body.keyword.trim(); //需要去除空格
  primerDataMethods.searchByKeyword(keyword,function(err,result){
    if(err){
      rep.json(err)
      return
    }
    rep.json(result)
  })
})
router.post("/userData",function(req,rep,next){
  keyword=req.body.keyword.trim(); //需要去除空格
  primerDataMethods.searchByUser(keyword,function(err,result){
    if(err){
      rep.json(err)
      return
    }
    rep.json(result)
  })
})

/* 数据插入 */
router.post("/insert",function(req,rep,next){
  authenticateMethods.isLogin(req,function(err,result){
    if(err){
      rep.json(err)
      return
    }
    if(result==0){ //cookie修改之后resule为空也需要重新登录
      rep.json({
        "authenticateThrought":"no"
      })
      return
    }
    if(primerDataMethods.checkInsertData(req.body)){
      primerDataMethods.insertItem(primerDataMethods.checkInsertData(req.body),function(err,result){
        if(err && err.sqlState=="23000"){
          rep.send(errorCategory.mysql.DuplicateInsert) //mysql自带错误,由于重复插入；不需要跳转到错误中间件
          return
        }else if(err){
          rep.json(errorCategory.mysql.sql)
          return
        }
        rep.json({"insert":1})
      })
    }else{
      rep.json(errorCategory.mysql.requireFields)
      return
    }
  })
})
/* 根据订单号更新数据 */
router.post("/update",function(req,rep,next){
  authenticateMethods.isLogin(req,function(err,result){
    if(err){
      rep.json(err)
      return
    }
    if(result==0){ //cookie修改之后resule为空也需要重新登录
      rep.json({
        "authenticateThrought":"no"
      })
      return
    }
    if(primerDataMethods.checkInsertData(req.body)){
      primerDataMethods.updateByOne(primerDataMethods.checkInsertData(req.body),function(err,data){
       if(err){
            rep.json(err)
            return
          }else{
            rep.json({"update":1});
          } 
        })
    }else{
      rep.json(errorCategory.requireFields)
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
/* 根据post请求得到的订单号，删除数据 */
router.post("/delete",function(req,rep,next){
  authenticateMethods.isLogin(req,function(err,result){
    if(err){
      rep.json(err)
      return
    }
    if(result==0){ //cookie修改之后resule为空也需要重新登录
      rep.json({
        "authenticateThrought":"no"
      })
      return
    }
    primerDataMethods.deleteByArray(req.body.deleteArry,function(err){
      if(err){
        rep.json(err)
        return
      }
      rep.json({"delete":1});
    })
    

  })
})

function deleteFileByPath(filePath){
    fs.unlink(filePath,function(err){
      if(err){
        return console.log(err);
      }
      console.log("上传文件:"+filePath+"成功删除!")
    })
}
/*文件上传 */
router.post("/uploadFile",uploadPath.single('file'),function(req,rep){
  let tmpFilePath=req.file.path;
  const workSheetsFromFile = xlsx.parse(tmpFilePath);
  //遍历数组，从第4行开始直到遇到空数组停止
  let endIndex=4;
  while(workSheetsFromFile[0]['data'][endIndex]!=''){
    endIndex+=1
  }
  if(endIndex==4){
    deleteFileByPath(tmpFilePath);
    rep.json({"upload":0}) //上传内容为空
    return
  }
  let insertDataArray=workSheetsFromFile[0]['data'].slice(4,endIndex);
  primerDataMethods.insertByArray(req.cookies.userId,insertDataArray,function(err,result){
    if(err){
      deleteFileByPath(tmpFilePath);
      rep.json(err)
      return
    }
    if(result.errno==1062){
      deleteFileByPath(tmpFilePath);
      rep.json(result)
      return
    }
    deleteFileByPath(tmpFilePath);
    rep.json({"upload":1})
  })
  
})
module.exports=router