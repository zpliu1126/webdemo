<template>
  <el-main>
    <el-row :span="24" justify="center" type="flex">
      <el-col :span="24">
       <el-form :model="input" status-icon :rules="rules" ref="input">
         <el-form-item prop="keyword">
           <el-input size="large"  v-model="input.keyword" type="text" >
            <el-button  @click="onSubmit('input')"  slot="append" icon="el-icon-search"></el-button>
           </el-input>
         </el-form-item>
         <el-form-item label="Accurate Search" prop="rule">
          <el-switch activate-value="true" inactivate-value="false" active-color="#13ce66"  v-model="input.rule"></el-switch>
         </el-form-item>
       </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import confVar from './configure.js' 
var httpUrl=confVar.httpUrl

export default {
  data() {
    var checKeyword=(rule,value,callback)=>{
      if(!value){
        return callback(new Error("搜索内容不能为空"))
      }else{
        callback() //success validate
      }
    };
    return {
     input:{
       keyword:'',
       rule:'false'
     },
     rules:{
     keyword:[{validator:checKeyword,trigger:'blur'}],
    },
    }
  },
  methods: {
    onSubmit(ruleform){
      this.$refs[ruleform].validate((valid) => {
          if (valid) {
           //success validate
           this.requestByKeyword(this.input)
          }
        });
    },
    requestByKeyword(formData){
      this.$http.post(httpUrl+"/",formData,{emulateJSON: true}).then(
        //success reponse
        (reponse)=>{
          this.$emit('seach-bykeword',{"result":reponse.body,"keyword":this.input.keyword})    
      },
      //failed reponse
      (reponse)=>{alert("somethings error!")})
    } 
  },
}
</script>
<style scoped>
 .el-main .el-row{
   height: 100%;
   align-items: center;
 }
 .el-main .el-row .el-col{
  display: inherit;
  justify-content: center;
 }
 .el-form-item__label{
   color:#7f8fa6;
   font-size: 16px;
 }

</style>