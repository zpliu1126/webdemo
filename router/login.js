var express=require("express")
var router=express.Router()
router.get("/login",function(req,rep,next){
  rep.render("login.html")
})
module.exports=router