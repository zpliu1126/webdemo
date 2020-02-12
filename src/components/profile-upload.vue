<template>
  <el-main id="uploadPrimer">
    <el-row>
      <el-col :xs="12" :sm="6" :span="8">
        <el-button type="warning" @click="dialogFormVisible=true">单个上传</el-button>
      </el-col>
    </el-row>
    <el-row>
      <span>批量上传请先下载模板文件！</span>
      <el-link type="info" :href="templateUrl">
        <i class="el-icon-document"></i>模板文件</el-link>
    </el-row>
    <el-row>
      <el-upload 
      ref="upload"
      class="upload-demo" 
      :drag="uploadDrag" :action="uploadFileUrl" multiple
      :before-upload="beforeFileUpload"
      :on-success="handleFileuploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
      </el-upload>
    </el-row>
    <el-dialog title="PrimerData" :visible.sync="dialogFormVisible" :width="dialogWidth">
      <el-form :model="updateForm" ref="updateForm" status-icon :rules="rules">
        <el-form-item label="订购人" prop="chineseName" :label-width="formLabelWidth">
          <el-input v-model="updateForm.chineseName" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="课题组老师" prop="teacher" :label-width="formLabelWidth">
          <el-input v-model="updateForm.teacher" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="公司" prop="company" :label-width="formLabelWidth">
          <el-input v-model="updateForm.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="订单号" prop="order_number" :label-width="formLabelWidth">
          <el-input v-model="updateForm.order_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="序列" prop="sequence" :label-width="formLabelWidth">
          <el-input v-model="updateForm.sequence" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="合成编号" prop="synthesis_num" :label-width="formLabelWidth">
          <el-input v-model="updateForm.synthesis_num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="二代基因编号" :label-width="formLabelWidth">
          <el-input v-model="updateForm.secondID" autocomplete="off" placeholder="没有可不填"></el-input>
        </el-form-item>
        <el-form-item label="三代基因编号" :label-width="formLabelWidth">
          <el-input v-model="updateForm.thirdID" autocomplete="off" placeholder="没有可不填"></el-input>
        </el-form-item>
        <el-form-item label="GC含量" :label-width="formLabelWidth">
          <el-input v-model.number="updateForm.GCContent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="TM值" :label-width="formLabelWidth">
          <el-input v-model.number="updateForm.TMValue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="硫代数" :label-width="formLabelWidth">
          <el-input v-model.number="updateForm.ThioCount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修饰方式" :label-width="formLabelWidth">
          <el-input v-model="updateForm.decoratePattern" autocomplete="off"></el-input>
        </el-form-item>
      <el-form-item label="管数" :label-width="formLabelWidth">
        <el-input v-model.number="updateForm.tubeCount" autocomplete="off"></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancle</el-button>
        <el-button type="success" @click="handlevalidateForm('updateForm')">Upload</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>
<script>
  import confVar from './configure.js'
  var httpUrl = confVar.httpUrl
  export default {
    props: {
      user: {
      },
    },
    data() {
      var notNull=(rule,value,callback)=>{
      if(!value){
        return callback(new Error("内容不能为空"))
      }else{
        callback() //success validate
      }
    };
      let chineseName =document.cookie ? unescape(unescape(this.$cookies.get('chineseName'))) : '';//获取cookie信息
      let teacher =document.cookie ? unescape(unescape(this.$cookies.get('teacherName'))) : '';//获取cookie信息
      let subscriber=document.cookie ? this.$cookies.get('userId') :'';
      let uploadFileUrl=httpUrl+"/uploadFile";
      let templateUrl=httpUrl+"/public/primer/template.xlsx"
      return {
        templateUrl,
        uploadFileUrl,
        dupliacteSql:false,
        chineseName,
        subscriber,
        teacher,
        uploadDrag: true,
        dialogFormVisible: false,
        formLabelWidth: "100px",
        updateForm: {
          chineseName,
          subscriber,
          teacher,
          secondID: '',
          thirdID: '',
          company: '',
          GCContent: '',
          TMValue: '',
          synthesis_num: '',
          sequence: '',
          order_number: '',
          tubeCount: '',
          decoratePattern: '',
          ThioCount: '',
        },
        rules:{
          chineseName:[{validator:notNull,trigger:'blur'}],
          teacher:[{validator:notNull,trigger:'blur'}],
          company:[{validator:notNull,trigger:'blur'}],
          synthesis_num:[{validator:notNull,trigger:'blur'}],
          order_number:[{validator:notNull,trigger:'blur'}],
          sequence:[{validator:notNull,trigger:'blur'}],
        },
      }
    },
    methods: {
      handleFileuploadSuccess(reponse,file,fileList){
        const h = this.$createElement;
        if(reponse.errCode){
          this.$router.push({ name: "errorPage", params: { "errorMessage": reponse} });
          return
        }
        else if(reponse.errno==1062){
          this.$notify({
          title: '重复插入的订单编号',
          message: h('i', { style: 'color: #E6A23C'}, reponse.errorMessage),
          type: 'warning',
        });
        }else if(reponse.upload==0){
          this.$message({
                showClose: true,
                message: '文件没有内容！',
                type: 'error',
          });
        }else{
        this.$message({
                showClose: true,
                message: '文件上传成功，数据已经保存！',
                type: 'success',
        });
        }
        this.$refs.upload.clearFiles();
      },
      beforeFileUpload(file){
          const isXlsx=file.type=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          if(!isXlsx){
            this.$message.error('上传文件只能是 xlsx 格式!');
          }
          return isXlsx;
      },
      handlevalidateForm(ruleform){
        this.$refs[ruleform].validate((valid) => {
          if (valid) {
           //success validate
           this.handleUploadByone()
          }
        });
      },
      handleUploadByone() {
        this.$http.post(httpUrl + "/insert", this.updateForm, { emulateJSON: true }).then(
          (reponse) => {
            if (reponse.body.errCode) {
              //后台出错了
              this.$router.push({ name: "errorPage", params: { "errorMessage": reponse.body } });
              return
            }
            if (reponse.body.authenticateThrought == "no") {
              this.$message({
                showClose: true,
                message: '抱歉! 没有权限操作登录后重试',
                type: 'error',
              });
              setTimeout(() => (this.$router.push({ name: "loginPage" })), 3000)
              return
            }
            if(reponse.body.insert==1){
              this.$message({
                showClose: true,
                message: '插入成功！',
                type: 'success',
              });
              
              for(var key in this.updateForm){
                this.updateForm[key]=''
              }
              this.updateForm.teacher=this.teacher
              this.updateForm.subscriber=this.subscriber
              this.updateForm.chineseName=this.chineseName
              this.dialogFormVisible=false;
              return
            }
          },
          //failed reponse
          (reponse) => {
            this.$message({
              showClose: true,
              message: '服务器开小差啦!',
              type: 'warning',
            });
          }
        )
      }
    },
    computed: {
      dialogWidth() {
        if (window.innerWidth >= 600) {
          return "50%"
        }
        return "85%"
      },
    },
  }
</script>
<style scoped>
  .el-main .el-row {
    margin-top: 10px;
  }
</style>