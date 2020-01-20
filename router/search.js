var express=require("express")
var router=express.Router()
router.get("/search",function(req,rep,next){
  if(!req){
    
  }else{
    return next({
      errCode:"1",
      errMessage:"test err"
    })
  }
})

module.exports=router