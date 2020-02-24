<template>
  <el-container id="register" direction="vertical">
    <div class="stars">

      <span class="star" ref="star" v-for="(item,index) in starsCount" :key="index"></span>
    </div>
    <!--背景层，不要删除，不然没有作用-->
    <headerComponent height="10%"></headerComponent>
    <el-row type="flex" justify="center" style='height:"80%";overflow-y: scroll;'>
      <el-col :md="18">
        <el-form :model="input" ref="infoInput" :rules="rules" status-icon>
          <el-row>
            <el-col :md="6" :sm="20" :offset="4">
              <el-upload class="avatar-uploader" :action='httpUrl+"/mster/img"' :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" style="
                padding-left: 55px;
                font-size: 15px;
                color: #909399;
                margin-top:10px;"
                >上传头像</div>
              </el-upload>
            </el-col>
            <el-col :md="6" :sm="16" :xs="23">
              <el-form-item prop="name">
                <el-input type="text" v-model.trim="input.name" size="large" class="el-input-prefix">
                  <el-button slot="prepend">姓名</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="sex">
                <el-select style="width:100%;" filterable v-model="input.sex" placeholder="性别">
                  <el-option v-for="item in selectSex" :key="item.id" :label="item.label" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="tel">
                <el-input type="text" v-model.trim="input.tel" size="large" class="el-input-prefix">
                  <el-button slot="prepend">电话</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="school">
                <el-input type="text" v-model.trim="input.school" size="large" class="el-input-prefix">
                  <el-button slot="prepend">本科毕业院校</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="teacherId">
                <el-select style="width:100%;" multiple filterable v-model="input.teacherId" placeholder="有意向的导师">
                  <el-option v-for="item in selectTeacher" :key="item.id" :label="item.teacher_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-col :span="24">
                <el-tag type="warning" :style="tagStyle">考研成绩</el-tag>
              </el-col>
              <el-col :md="6" :sm="20" :xs="23"  :offset="2">
                <el-input v-model="course" placeholder="科目"></el-input>
              </el-col>
              <el-col :md="6" :sm="20" :xs="23" :offset="2">
                <el-input v-model="grade" placeholder="成绩"></el-input>
              </el-col>
              <el-col :md="3" :sm="20" :xs="23" :offset="2">
                <el-button @click="addCourse" type="primary">添加科目</el-button>
              </el-col>
              <el-col :md="16" :sm="16" :xs="23" :offset="2">
              <el-input v-for="(oneTranscript,index) in input.transcript" :key="oneTranscript.key"
                v-if="oneTranscript.course" type="text" disabled v-model.trim="oneTranscript.grade" size="large"
                class="el-input-prefix">
                <el-button slot="prepend">{{oneTranscript.course}}</el-button>
              </el-input>
            </el-col>

            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-tag type="warning" :style="tagStyle">科研经历</el-tag>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-form-item prop="searchExperience">
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" placeholder="简要叙述一下，大学期间所参与过的一些科研项目；毕业课题等"
                  v-model="input.searchExperience">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-tag type="warning" :style="tagStyle">学生工作经历</el-tag>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-form-item prop="studentExperience">
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" placeholder="大学期间参与的学生工作"
                  v-model="input.studentExperience">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-tag type="warning" :style="tagStyle">大学期间获奖情况</el-tag>
            </el-col>
            <el-col :span="20" :offset="2" >
              <el-form-item prop="honor">
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入内容"
                  v-model="input.honor">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-tag type="warning" :style="tagStyle">兴趣爱好与特长</el-tag>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-form-item prop="interest">
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入内容"
                  v-model="input.interest">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-form-item>
                <el-button style="width:100%" type="success" @click="handleInfo('infoInput')">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <footerComponent height="15%"></footerComponent>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span style="color: #67C23A;"><i class="el-icon-check"></i></span>
      <span>上传成功!</span>
      <div>
        {{clock}}s后将自动刷新当前浏览器窗口
      </div>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </el-container>

</template>
<script>
  import footerComponent from './../footer.vue'
  import headerComponent from './../masterComponents/header.vue'
  import confVar from './../configure.js'
  var httpUrl = confVar.httpUrl
  export default {
    components: {
      headerComponent,
      footerComponent
    },
    data() {
      let checkifNull = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("内容不能为空"))
        } else {
          callback()
        }
      }

      let windowWidth = window.innerWidth;
      let selectSex = [
        {
          id: 0,
          "label": "男",
        }, {
          id: 1,
          "label": "女"
        }
      ];
      return {
        tagStyle:{
          'margin-top':"10px",
          'margin-bottom':'10px',
          'font-size':'20px',
        },
        dialogVisible: false,
        rules: {
          name: [{ validator: checkifNull, trigger: 'blur' }],
          school: [{ validator: checkifNull, trigger: 'blur' }],
          studentExperience: [{ validator: checkifNull, trigger: 'blur' }],
          searchExperience: [{ validator: checkifNull, trigger: 'blur' }],
          honor: [{ validator: checkifNull, trigger: 'blur' }],
          interest: [{ validator: checkifNull, trigger: 'blur' }],
          teacherId: [{ validator: checkifNull, trigger: 'blur' }],
          tel: [{ validator: checkifNull, trigger: 'blur' }],
        },
        httpUrl,
        starsCount: 500,
        distance: 500,
        imageUrl: '',
        selectTeacher: '',
        input: {
          name: '',
          sex: '',
          school: '',
          transcript: [],
          studentExperience: '',
          searchExperience: '',
          honor: '',
          interest: '',
          teacherId: '',
          tel: '',
          imgUrl: '',
        },
        selectSex,
        course: '',
        grade: '',
        clock:'',
        totalTime:5,
      }
    },
    computed: {

    },
    beforeMount() {
      this.$http.get(httpUrl + "/teacher").then(
        //success reponse
        (reponse) => {
          if (reponse.body.errCode) {
            //后台出错了
            this.$router.push({ name: "errorPage", params: { "errorMessage": reponse.body } });
            return
          }
          this.selectTeacher = reponse.body;
          return
        },
        //faile reponse
        (reponse) => {
          this.$message({
            showClose: true,
            message: '服务器开小差啦！稍后再试',
            type: 'error',
          });
        },
      )
    },
    methods: {
      handleClose() {
        return
        /*点击关闭对话框无效*/
      },
      countDown(){
          window.setTimeout(()=>{this.dialogVisible=false},5500)
          window.setTimeout(()=>{location.reload()},5550)
          let clockDown=window.setInterval(()=>{
            this.totalTime--
            this.clock=this.totalTime
          },1000)
      },
      handleInfo(ruleform) {
        if (this.input.transcript.length != 0) {
          this.$refs.infoInput.validate((valid) => {
            if (valid) {
              this.$http.post(httpUrl + "/master/info", this.input, { emulateJSON: true }).then(
                (reponse) => { 
                  this.dialogVisible=true
                  this.countDown()
                },
                (reponse) => { }
              )
              return
            }

          })
        } else {
          this.$message({
            showClose: true,
            message: '请填写考研各科成绩',
            type: 'error',
          });
        }
      },
      addCourse() {
        if (this.grade && this.course) {
          let grade = this.grade;
          let course = this.course
          this.input.transcript.push({
            grade,
            course,
            key: Date.now(),
          })
          this.grade = ''
          this.course = ''
        } else {
          this.$message({
            showClose: true,
            message: '请填写对应的科目与成绩',
            type: 'error',
          });
        }

      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.input.imgUrl = res.filename
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    },
    mounted() {
      let _this = this;
      // 原生js
      let _starList = document.getElementsByClassName("star")
      let starArr = Array.prototype.slice.call(_starList)
      // vue
      let starList = this.$refs.star
      // 遍历添加样式
      starArr.forEach(item => {
        var s = 0.2 + (Math.random() * 1);
        var thisDistance = _this.distance + (Math.random() * 300);
        item.style.transformOrigin = `0 0 ${thisDistance}px`
        item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * -50)}deg) scale(${s},${s})`
      })
    },
  }
</script>
<style scoped>
  body>#register {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin-left: 0px;
  }

  #register {
    height: 100%;
    width: 100%;
    /* background-image: url(http://cotton.hzau.edu.cn/primer/public/img/register.jpg);
    background-repeat: repeat;
    background-size: cover; */
    background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #75517d, #1b2947);
    background: radial-gradient(220% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%, #f8c291);
    background-attachment: fixed;
    overflow: hidden;
  }



  @keyframes rotate {
    0% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }

    100% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
    }
  }

  .stars {
    transform: perspective(500px);
    transform-style: preserve-3d;
    position: absolute;
    bottom: 0;
    perspective-origin: 50% 100%;
    left: 50%;
    animation: rotate 90s infinite linear;
  }

  .star {
    width: 2px;
    height: 2px;
    background: #F7F7B6;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0 0 -300px;
    transform: translate3d(0, 0, -300px);
    backface-visibility: hidden;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    background-color: white;
  }

  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
</style>