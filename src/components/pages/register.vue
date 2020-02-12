<template>
  <el-container id="register" direction="vertical"  >
    <headerComponent height="15%"></headerComponent>
    <el-container class="register-form">
      <el-row :span="24" justify="center" type="flex">
        <el-col :span="24">
          <el-form :model="input" :rules="registerFormRules" status-icon ref="registerInput" status-icon>
            <el-form-item prop="name" >
              <el-input type="text" v-model.trim="input.name" size="large" placeholder="student ID" class="el-input-prefix">
                <el-button slot="prepend">账户</el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="chineseName" >
              <el-input type="text"v-model.trim="input.chineseName" size="large"  class="el-input-prefix">
                <el-button slot="prepend">姓名</el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model.trim="input.password" size="large" >
                <el-button slot="prepend">密码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="confPassword">
              <el-input type="password" v-model.trim="input.confPassword" size="large" >
                <el-button slot="prepend">确认密码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="teacherId" >
              <el-select style="width:100%;" filterable v-model="input.teacherId" placeholder="请选择导师">
                <el-option
                  v-for="item in selectTeacher"
                  :key="item.id"
                  :label="item.teacher_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button :style="loginButton" type="success" @click="handleRegister('registerInput')">Register</el-button>
            </el-form-item>
          </el-form>
        </el-col>
    </el-row>
    </el-container>
    <footerComponent height="18%"></footerComponent>
    </el-container>

</template>
<script>
import footerComponent from './../footer.vue'
import headerComponent from './../header.vue'
import confVar from './../configure.js' 
var httpUrl=confVar.httpUrl
export default{
  components:{
    headerComponent,
    footerComponent
  },
  data() {
    let checkIfNull=(rule, value, callback)=>{
        if(!value){
          return callback(new Error("请输出内容"))
        }else{
          return callback()
        }
      };
    let confirmPassword=(rule,value,callback)=>{
      if(value!=this.input.password){
          return callback(new Error("两次密码不一样"))
        }else{
          return callback()
        }
    };
    return {
      input:{
        name:'',
        password:'',
        chineseName:'',
        confPassword:'',
        teacherId:'',
      },
      selectTeacher:'',
      registerFormRules:{
          name:[{validator:checkIfNull,trigger:'blur'}],
          password:[{validator:checkIfNull,trigger:'blur'}],
          chineseName:[{validator:checkIfNull,trigger:'blur'}],
          teacherId:[{validator:checkIfNull,trigger:'blur'}],
          confPassword:[{validator:confirmPassword,trigger:'blur'}]
        },
     loginButton:{
          "width":"100%",
          "font-size":"16px",
          "color":"#FFF",
          "text-align":"center",
        },
    }
  },
  computed: {
    teacher_name(){ //将老师名字发给后端用于存进cookie
      return this.selectTeacher ? this.selectTeacher.filter((item)=>{
      if(item.id==this.input.teacherId){
        return item
      }
    })[0].teacher_name :'';
    }
  },
  beforeMount() {
    this.$http.get(httpUrl+"/teacher").then(
      //success reponse
      (reponse)=>{
        if (reponse.body.errCode) {
              //后台出错了
              this.$router.push({ name: "errorPage", params: { "errorMessage": reponse.body } });
              return
        }
        this.selectTeacher=reponse.body;
        return
      },
      //faile reponse
      (reponse)=>{
        this.$message({
                showClose: true,
                message: '服务器开小差啦！稍后再试',
                type: 'error',
        });
      },
    )
  },
  methods: {
    handleRegister(ruleform){
      this.$refs[ruleform].validate((validate)=>{
        if(validate){
          this.input.teacher_name=this.teacher_name
          this.$http.post(httpUrl+"/register",this.input,{emulateJSON: true}).then(
            (reponse)=>{
              if (reponse.body.errCode=="6") {
              //后台出错了
              this.$message({
                showClose: true,
                message: '账号已经存在，换一个试试',
                type: 'info',
            });
            return
           } 
           if (reponse.body.errCode){
            this.$router.push({ name: "errorPage", params: { "errorMessage": reponse.body } });
              return
           }
           this.$message({
                showClose: true,
                message: '注册成功！',
                type: 'success',
            });
           this.$router.push({name:"profilePage",params:{name:this.input.name}})
          },
            (reponse)=>{
              this.$message({
                showClose: true,
                message: '服务器失联啦！稍后再试',
                type: 'error',
            });
          }
          )
        }
      })
    }
  },
}
</script>
<style scoped>
body > #register{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin-left: 0px;
}
#register{
    height: 100%;
    width: 100%;
    background-image: url(https://imgchr.com/content/images/system/home_cover_1552414407320_3a5f92.jpg);
    background-repeat: repeat;
    background-size: cover;
}
.register-form{
    height: 60%;
    width: 100%;
    justify-content: center;
}
.register-form .el-row{
  align-items: center;
}
.register-form .el-row .el-col{
  display: inherit;
  justify-content: center;
}

</style>