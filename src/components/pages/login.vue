<template>
  <div id="loginContainer" :style="bgStyle">
    <headerComponents active-index="2"></headerComponents>
    <el-row :span="24" justify="center" type="flex">
      <el-col :span="24">
        <el-form :model="input" :rules="loginFormRules" status-icon ref="loginInput" status-icon>
          <el-form-item prop="name" >
            <el-input type="text"v-model.trim="input.name" size="large"  class="el-input-prefix">
              <el-button slot="prepend">账户</el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model.trim="input.password" size="large" >
              <el-button slot="prepend">密码</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :style="loginButton" type="success" @click="handleLogin('loginInput')">login</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <footerComponents></footerComponents>
  </div>
</template>
<script>
import confVar from './../configure.js' 
  var httpUrl=confVar.httpUrl
  import headerComponents from "./../header.vue"
  import footerComponents from "./../footer.vue"
  export default {
    data() {
      var checkInputAccount=(rule, value, callback)=>{
        if(!value){
          return callback(new Error("账户不能为空"))
        }else{
          return callback()
        }
      };
      var checkInputPassowrd=(rule, value, callback)=>{
        if(!value){
          return callback(new Error("密码不能为空"))
        }else{
          return callback()
        }
      };
      return {
        input:{
          name:'',
          password:'',
        },
        loginButton:{
          "width":"98%",
          "margin-left": "1%",
        },
        loginFormRules:{
          name:[{validator:checkInputAccount,trigger:'blur'}],
          password:[{validator:checkInputPassowrd,trigger:'blur'}],
        }
      }
    },  
    components: {
      headerComponents,
      footerComponents,
    },
    methods: {
      handleLogin(ruleform){
        this.$refs[ruleform].validate((valid) => {
          if (valid) {
           //success validate
           this.$http.post(httpUrl+"login",this.input,{emulateJSON: true}).then(
        //success reponse
        (reponse)=>{
          console.log(reponse)
        //  console.log(JSON.parse(reponse.body))    
        })
          }
        });
      }
    },
    computed: {
      bgStyle(){
        if(window.innerWidth>=800){
          return {
          "background-color": "rgb(41, 45, 62)",
          "background-image": "url(http://cotton.hzau.edu.cn/primer/public/img/20190921231830.svg)"
        }
      }else{
        return {
          "background-color": "rgb(41, 45, 62)",
          "background-image": "url(http://cotton.hzau.edu.cn/primer/public/img/login-sm-background.jpg)"
        }
      }
    }
    },
  }
</script>
<style scoped>
  #loginContainer {
    position: absolute;
    top: 0px;
    bottom: 0px;
    height: 100%;
    width: 100%;
    margin-left: 0px;
    background-repeat: repeat;
    background-size: cover;
    border-top: 1px solid red;
  }
  #loginContainer .el-row {
    height: 70%;
    align-items: center;
  }

  #loginContainer .el-row .el-col {
    display: inherit;
    justify-content: center;
  }
</style>