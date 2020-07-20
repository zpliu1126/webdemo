var express = require("express")
var multer = require('multer')
var path = require("path")
var url = require("url") //处理get请求参数
var router = express.Router()
var errorCategory = require(path.resolve(__dirname, "./../include/error.js"))
var authenticateMethods = require(path.resolve(__dirname + "/../modules/authenticate.js"))
var primerDataMethods = require(path.resolve(__dirname + "/../modules/primerData.js"))
var uploadPath = multer({ dest: path.resolve(__dirname, "./../uploads/masterImg") }) //上传文件存储目录
var errorCategory = require(path.resolve(__dirname + "/../include/error.js"))
var poolConnection = require(path.resolve(__dirname + "/../include/mysql_config.js")).poolConnection
var fs=require("fs")

function linkTeacherId(array) {
  return array
}
function addMessage(body, callback) {
  /*teacherID 与成绩交给前端检查 */
  let transcript = body.transcript.map(element => {
    return element.grade + "_" + element.course
  }).join("*")
  let teacherId = body.teacherId.join("*")
  let undergraduateGrade=body.undergraduateGrade ? body.undergraduateGrade.join("*") : ''
  poolConnection.getConnection(function (err, connection) {
    if (err) {
      callback(errorCategory.mysql.connection)//error category
      return;
    }
    sql = `
  INSERT INTO masterInfo(name,interest,honor,teacherId,tel,sex,school,
    transcript,studentExperience,searchExperience,imgUrl,
    english,computer,home,other,undergraduateGrade)
   VALUES("${body.name}","${body.interest}",
   "${body.honor}","${teacherId}",
   "${body.tel}","${body.sex}","${body.school}","${transcript}",
   "${body.studentExperience}","${body.searchExperience}","${body.imgUrl}",
   "${body.english}","${body.computer}","${body.home}","${body.other}","${undergraduateGrade}")
 `
  console.log(sql)
    connection.query(sql, function (err, result, fields) {
      if (err && err.errno == 1062) {
        callback(errorCategory.mysql.Duplicateaccount); //error category
        return;
      }
      connection.release();
      callback(null, result)
    })
  })
}
router.post("/master/info", function (req, rep) {
  // console.log(req.body)
  // rep.send("ok")
  console.log(req.body)
  addMessage(req.body, function (err, data) {
    if (err) {
      rep.send(err)
      return
    }
    rep.send("ok")
    return
  })
})

function getMessage(callback) {
  poolConnection.getConnection(function (err, connection) {
    if (err) {
      callback(errorCategory.mysql.connection)//error category
      return;
    }
    sql = `select * from masterInfo`
    connection.query(sql, function (err, result, fields) {
      if (err && err.errno == 1062) {
        callback(errorCategory.mysql.Duplicateaccount); //error category
        return;
      }
      connection.release();
      callback(null, result)
    })
  })
}
router.get("/master/show", function (req, rep) {
  getMessage(function (err, result) {
    if (err) {
      rep.json(err)
      return
    }
    filterResult=result.map((oneItem)=>{
      oneItem.teacherId = oneItem.teacherId.split("*").map((item) => { return parseInt(item) })
      oneItem.transcript = oneItem.transcript.split("*").map((item) => { return { 'grade': item.split("_")[0], 'course': item.split("_")[1] } })
      oneItem.undergraduateGrade=oneItem.undergraduateGrade ? oneItem.undergraduateGrade.split("*") : ''
      return oneItem
    })
    rep.json(filterResult)
  })
})

/*上传学生个人图片API  上传本科成绩单 */
router.post("/master/img", uploadPath.single('file'), function (req, rep) {
  rep.json({ filename: req.file.filename });
})

/*删除图片 */
router.post("/master/img/del",function(req,rep){
  filename=req.body.filename
  filePath=path.resolve(__dirname,'./../uploads/masterImg/'+filename)
  console.log(filePath)
  fs.unlink(filePath,function(err){
    if(err){
      console.log(filename+"删除出错")
    }
    return
  })
  rep.send("ok")
})


module.exports = router