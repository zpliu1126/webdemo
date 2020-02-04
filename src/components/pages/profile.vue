<template>
  <div id="profilePage">
    <el-container direction="vertical"  v-if="isLogin">
      <headerComponent :isLogin="isLogin"></headerComponent>
      <el-container>
        <profileAside @page-change="handlePageChange" class="hidden-sm-and-down"></profileAside>
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
          <acknowledge v-show="pageShow.user"></acknowledge>
          <profilePrimerData v-show="pageShow.primer" :input="{'keyword':$route.params.name, rule:'true'}"></profilePrimerData>
        </el-main>
      </el-container>
      <footerComponent height="20%"></footerComponent>
    </el-container>
    <el-container v-if="!isLogin">
      抱歉！没有权限访问该页面，请登录后重试！
    </el-container>
  </div>
</template>
<script>
  import confVar from './../configure.js'
  var httpUrl = confVar.httpUrl
  import profileAside from './../profile-aside.vue'
  import acknowledge from './../acknowledge.vue'
  import footerComponent from './../footer.vue'
  import headerComponent from './../header.vue'
  import profilePrimerData from './../profile-primerdata.vue'
  export default {
    data() {
      return {
        myProfileItem:{
          width:"90%",
          "aligin-item":"center"
        },
        elDropdown:{
          "font-size":"25px",
        },
        isLogin:false,
        pageShow:{
          user:true,
          primer:false,
        },
      }
    },
    components: {
      profileAside,
      acknowledge,
      footerComponent,
      headerComponent,
      profilePrimerData,
    },
    methods: {
      handlePageChange(changeIndex){
        for(let key in this.pageShow){
          this.pageShow[key]=false
        }
        this.pageShow[changeIndex]=true;
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
                  setTimeout(()=>(this.$router.push({name:"loginPage"})),2000)
                  return
                }
                if(reponse.body.authenticateThrought==="yes"){
                  this.isLogin=true;
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
  .el-header, .el-footer{
    background-color: #2f3640;
  }
  .el-header .el-row{
    color: aliceblue;
  }
  .el-header .el-row .el-col{
    display: inherit;
    justify-content: center;
    align-items: center;
  }

</style>