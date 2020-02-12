<template>
  <div id="profilePage">
    <el-container direction="vertical"  v-if="isLogin">
      <headerComponent   @page-change="handlePageChange"></headerComponent>
      <el-container>
        <profileAside @page-change="handlePageChange" class="hidden-sm-and-down"></profileAside>
        <el-main>
          <h1>hello, {{userName}} <i class="el-icon-medal-1"></i></h1>
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
          <profilePrimerData   v-show="pageShow.primer" :ifAjax="pageShow.primer":input="{'keyword':userId, rule:'true'}"></profilePrimerData>
          <profilePrimerUpload v-show="pageShow.upload" :user="$route.params.name"></profilePrimerUpload>
        </el-main>
      </el-container>
      <footerComponent height="20%"></footerComponent>
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
  import profilePrimerUpload from "./../profile-upload.vue"
  export default {
    props:{
      pageShow:{
         default:()=>({ 
          user:true,
          primer:false,
          upload:false,
        })
      },
    },
    data() {
      let userName =document.cookie ? unescape(unescape(this.$cookies.get('chineseName'))) : '';
      let userId =document.cookie ?this.$cookies.get('userId'):'';
      return {
        myProfileItem:{
          width:"90%",
          "aligin-item":"center"
        },
        elDropdown:{
          "font-size":"25px",
        },
        isLogin:true,
        userName,
        userId,

      }
    },
    components: {
      profileAside,
      acknowledge,
      footerComponent,
      headerComponent,
      profilePrimerData,
      profilePrimerUpload,
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
      this.$http.get(httpUrl+"/profile").then(
            (reponse)=>{
              if(reponse.body.errCode){ //后端数据库连接失败
                  this.$router.push({name:"errorPage",params:{errorMessage:reponse.body}})
                  return
                }
                if(reponse.body.authenticateThrought=="no"){
                  this.$message({
                    showClose: true,
                    message: '没有权限访问，请登录后重试!',
                    type: 'error',
                  });
                  setTimeout(()=>(this.$router.push({name:"loginPage"})),2000)
                  return
                }
                if(reponse.body.authenticateThrought==="yes"){
                  this.isLogin=true;
                }
            },
            (errReponse)=>{
              this.$message({
                    showClose: true,
                    message: '服务器开小差啦，请稍后重试!',
                    type: 'error',
                  });
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