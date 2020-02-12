var path=require("path")
var errorCategory=require(path.resolve(__dirname,"./../include/error.js"))
var poolConnection=require(path.resolve(__dirname+"/../include/mysql_config.js")).poolConnection
var authenticateMethods=require(path.resolve(__dirname+"/../modules/authenticate.js"))

/* check psot data from client*/

function checkInsertData(post){
  let stringFields=["sequence","order_number","synthesis_num","company","list_number",
  "secondID","thirdID","primerName",
   "decoratePattern","purificationPattern",];
  if(post["sequence"] && post["subscriber"]  && post["company"] && post["synthesis_num"] && post["order_number"]){
  //保证必填项
  for(let index in stringFields){
    if(typeof post[stringFields[index]]=="undefined"){
        post[stringFields[index]]="None"
    }else{
        post[stringFields[index]]=post[stringFields[index]].trim()
    }
  }
  let intFields=["baseCount","tubeCount","contentCount","ThioCount"]
  let floatFields=["TMValue","MolecularWeight","GCContent"]
  for(let index in intFields){
    if(typeof post[intFields[index]]=="undefined" ||post[intFields[index]]==''){
      post[intFields[index]]=0
    }
    else{
      post[intFields[index]]=parseInt(post[intFields[index]])
    }
  }
  for(let index in floatFields){
    if(typeof post[floatFields[index]]=="undefined"|| post[floatFields[index]]==''){
      post[floatFields[index]]=0.0
    }
    else{
      post[floatFields[index]]=parseFloat(post[floatFields[index]])
    }
  }
  return post
  }else{
    return 0 //有必填项没有填写
  }
}

/*delete one item */
function deleteByOne(keyword,callback){
  poolConnection.getConnection(function(err,connection){
    if(err){
      callback(err)
      return
    }
    sql=`DELETE FROM \`primer\` WHERE \`order_number\`=${keyword}`;
    connection.query(sql,function(err,data){
      if(err){
        callback(err)
        return
      }
      connection.release()
      callback(null) //成功删除后，result结果是空的
    })
  })
}


/*delete Array */
function deleteByArray(deleteArray,callback){
  poolConnection.getConnection(function(err,connection){
    if(err){
      callback(err)
      return
    }
    let deletStr="('"+deleteArray.join("\',\'")+"')"
    sql=`DELETE FROM \`primer\` WHERE \`order_number\` IN ${deletStr}`;
    connection.query(sql,function(err,data){
      if(err){
        callback(err)
        return
      }
      connection.release()
      callback(null) //成功删除后，result结果是空的
    })
  })
}
/*更新单个数据项 */
function updateByOne(post,callback){
  poolConnection.getConnection(function(err,connection){
    if(err){
      callback(errorCategory.mysql.connection)
      return
    }
    sql=`UPDATE \`primer\` SET \`subscriber\`="${post.subscriber}",
    \`list_number\`="${post.list_number}",\`synthesis_num\`="${post.synthesis_num}",\`secondID\`="${post.secondID}",
    \`thirdID\`="${post.thirdID}",\`primerName\`="${post.primerName}",\`baseCount\`="${post.baseCount}"
    ,\`tubeCount\`="${post.tubeCount}",
    \`contentCount\`="${post.contentCount}",
    \`decoratePattern\`="${post.decoratePattern}",
    \`purificationPattern\`="${post.purificationPattern}",
    \`ThioCount\`="${post.ThioCount}",
    \`TMValue\`="${post.TMValue}",
    \`MolecularWeight\`="${post.MolecularWeight}",
    \`GCContent\`="${post.GCContent}",\`company\`="${post.company}",
    \`sequence\`="${post.sequence}"
    WHERE \`order_number\`="${post.order_number}"`
    connection.query(sql,function(err,result){
      if(err){
        callback(err)
        return
      }
      connection.release()
      callback(null,result)
    })
  })
}

/*单个元素的插入 */

function insertItem(post,callback){
  poolConnection.getConnection(function(err,connection){
    if(err){
      callback(errorCategory.mysql.connection)
      return
    }
    sql=`INSERT into primer (\`sequence\`,\`subscriber\`,\`order_number\`,
    \`list_number\`,\`synthesis_num\`,\`secondID\`,\`thirdID\`,
    \`primerName\`,\`baseCount\`,\`tubeCount\`,\`contentCount\`,\`decoratePattern\`,
    \`purificationPattern\`,\`ThioCount\`,\`TMValue\`,\`MolecularWeight\`,\`GCContent\`,\`company\`)
    VALUES ("${post.sequence}","${post.subscriber}",
      "${post.order_number}","${post.list_number}","${post.synthesis_num}",
      "${post.secondID}","${post.thirdID}","${post.primerName}",
      "${post.baseCount}","${post.tubeCount}","${post.contentCount}",
      "${post.decoratePattern}","${post.purificationPattern}","${post.ThioCount}",
      "${post.TMValue}","${post.MolecularWeight}","${post.GCContent}","${post.company}")`
    connection.query(sql,function(err,result){
      if(err){
        callback(err)
        return
      }
      connection.release()
      callback(null,result)
    })

  })
}

/*主页关键字搜索函数 */
function searchByKeyword(keyword ,callback){
  poolConnection.getConnection(function(err,connection){
    if(err){
      callback(errorCategory.mysql.connection)
      return
    }
    sql=`select  primer.*,user.chineseName,teacher.teacher_name FROM teacher,primer left join user on primer.subscriber=user.id 
    WHERE  user.teacherId=teacher.id AND CONCAT( user.chineseName,teacher.teacher_name,\`company\`,\`secondID\`,\`thirdID\`,\`order_number\`) 
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

function searchByUser(keyword,callback){
  poolConnection.getConnection(function(err,connection){
    if(err){
      callback(errorCategory.mysql.connection)
      return
    }
    sql= `select primer.*,user.chineseName,teacher.teacher_name 
    from teacher,primer left join user on primer.subscriber=user.id
     where user.teacherId=teacher.id AND user.id=${keyword};`
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

function insertByArray(userId,insertArray,callback){
  poolConnection.getConnection(function(err,connection){
    if(err){
      callback(errorCategory.mysql.connection)
      return
    }
    let sql=`INSERT into primer (\`subscriber\`,\`order_number\`,
    \`synthesis_num\`,\`list_number\`,\`secondID\`,\`thirdID\`,
    \`primerName\`,\`sequence\`,\`baseCount\`,\`tubeCount\`,\`contentCount\`,\`decoratePattern\`,\`remark\`,
    \`purificationPattern\`,\`ThioCount\`,\`TMValue\`,\`MolecularWeight\`,\`GCContent\`,\`company\`)
    VALUES ?`;
    // let tmpcallback=function(err,data){

    // }
    // for(let i=0;i<insertArray.length;i++){
    //   connection.query(sql,insertArray[i],function(err,result){
    //     if(err){
    //       console.log(err)
    //       tmpcallback(errorCategory.mysql.sql)
    //       return
    //    }
    //    tmpcallback(null,result)
    //   })
    // }
    // connection.release()
    insertArray.map((item)=>{
      item.unshift(userId)
    })
    let duplicateEntry=[]
    connection.query(sql,[insertArray],function(err,result)
    {  
     if(err && err.errno!=1062){
      callback(errorCategory.mysql.sql)
      return
    }else if(err && err.errno==1062){
      errorMessage=err.sqlMessage.split("for")[0]
      result={
        "errno":1062,
        errorMessage,
      }
      callback(null,result)
      return
    }else{
      connection.release()
      callback(null,result)
    } 
  })
    
  })
}
module.exports={
  checkInsertData,
  deleteByOne,
  updateByOne,
  insertItem,
  insertByArray,
  searchByKeyword,
  searchByUser,
  deleteByArray,
}