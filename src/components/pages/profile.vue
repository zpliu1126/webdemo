<template>
<div id="profilePage">
 {{$route.params.name}}
</div>
</template>
<script> 
import confVar from './../configure.js' 
var httpUrl=confVar.httpUrl
export default {
  data() {
    return {
      "dsad":12
    }
  },
beforeMount() {
  this.$http.get(httpUrl+"profile").then(
        (reponse)=>{
          if(reponse.body.errCode){ //后端数据库连接失败
              this.$router.push({name:"errorPage",params:{errorMessage:reponse.body}})
              return
            }
            if(reponse.body.authenticateThrought=="no"){
              alert("没有权限访问，请登录后再试!")
              this.$router.push({name:"loginPage"})
              return
            }
            if(reponse.body.authenticateThrought==="yes"){
              //认证成功，进入个人主页
              alert("允许进入")
            }
        },
        (errReponse)=>{
          alert("网络似乎有点延迟，稍后再试")
            return
        }
      )
},
} 
</script>
<style scoped> 

</style>