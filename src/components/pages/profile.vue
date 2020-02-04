<template>
  <div id="profilePage">
    <el-container>
      <el-header height="10vh">
      </el-header>
      <el-container>
        <profileAside class="hidden-sm-and-down"></profileAside>
        <el-main>
          <h1>hello, {{$route.params.name}}</h1>
          <el-row class="my-profile-wrapper">
            <el-col :lg="6" :md="12" class="my-profile-item">
              <el-button :style="myProfileItem" size="medium" type="info" plain>
                <el-row>
                  <el-col :span="8">
                    <img src="https://www.genscript.com.cn//images/my_profile_23.png" alt="">
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <p>用户设置</p>
                      <p>编辑个人信息</p>
                    </div>
                  </el-col>
                </el-row>
              </el-button>
            </el-col>
            <el-col  :lg="6" :md="12"  class="my-profile-item">
              <el-button :style="myProfileItem" type="info" plain>
                <el-row>
                  <el-col :span="8"><img src="https://www.genscript.com.cn//images/my_profile_29.png" alt=""></el-col>
                  <el-col :span="16">                <div>
                    <p>修改密码</p>
                    <p>登陆密码修改</p>
                  </div></el-col>
                </el-row>
              </el-button>
            </el-col>
          </el-row>
          <acknowledge></acknowledge>
        </el-main>
      </el-container>
    </el-container>
    <el-footer height="10vh">
    </el-footer>
  </div>
</template>
<script>
  import confVar from './../configure.js'
  var httpUrl = confVar.httpUrl
  import profileAside from './../profile-aside.vue'
  import acknowledge from './../acknowledge.vue'
  export default {
    data() {
      return {
        myProfileItem:{
          width:"90%",
          "aligin-item":"center"
        },
      }
    },
    components: {
      profileAside,
      acknowledge,
    }
    // beforeMount() {
    //   this.$http.get(httpUrl+"profile").then(
    //         (reponse)=>{
    //           if(reponse.body.errCode){ //后端数据库连接失败
    //               this.$router.push({name:"errorPage",params:{errorMessage:reponse.body}})
    //               return
    //             }
    //             if(reponse.body.authenticateThrought=="no"){
    //               alert("没有权限访问，请登录后再试!")
    //               this.$router.push({name:"loginPage"})
    //               return
    //             }
    //             if(reponse.body.authenticateThrought==="yes"){
    //               //认证成功，进入个人主页
    //               alert("允许进入")
    //             }
    //         },
    //         (errReponse)=>{
    //           alert("网络似乎有点延迟，稍后再试")
    //             return
    //         }
    //       )
    // },
  } 
</script>
<style scoped>
  .el-header,.el-footer {
    background-color: red;
  }

</style>