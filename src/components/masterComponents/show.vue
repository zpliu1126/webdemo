<template>
  <el-container direction="vertical" id="messageShow">
    <headerComponent></headerComponent>
    <el-container class="container">
      <el-aside width="200px" class="hidden-sm-and-down">
        <h1><i class="el-icon-user-solid"></i>学生列表</h1>
        <el-menu default-active="0" @select="handleOnePersonSelect('selectMenu')" ref="selectMenu">
          <el-menu-item :index='index' v-for='(onePerson,index) in tmpArray' :key='index'>
            <span>{{onePerson.name}}_{{onePerson.school}}</span>
          </el-menu-item>
        </el-menu>
        <el-row class="result-page">
          <el-pagination :hide-on-single-page="handleSinglePage" :page-size="pageSize"
            @current-change="handlecurrentPage" layout="prev, pager, next" background :total="reponseDataCount">
          </el-pagination>
        </el-row>
      </el-aside>
      <el-main>
        <el-row>
          <el-col :md="6" :sm="20" >
            <el-card :body-style="{ padding: '0px' }">
              <img :src='httpUrl+"/masterImg/"+onePerson.imgUrl' style="width: 100%;" />
              <div style="text-align: center;font-size: 18px; color: #909090;">
                大头贴
              </div>
            </el-card>
          </el-col>
          <el-col :md="10" :sm="16" :xs="24" :offset="1">
            <el-form :model="onePerson" ref="infoOnePerson">
              <el-form-item prop="name">
                <el-input type="text" v-model.trim="onePerson.name" disabled size="large" class="el-input-prefix">
                  <el-button slot="prepend">姓名</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="home">
                <el-input type="text" v-model.trim="onePerson.home" disabled size="large" class="el-input-prefix">
                  <el-button slot="prepend">籍贯</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="sex">
                <el-input type="text" :value="onePerson.sex == 0 ? '男':'女' " disabled size="large" class="el-input-prefix">
                  <el-button slot="prepend">性别</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="tel">
                <el-input type="text" v-model.trim="onePerson.tel" disabled size="large" class="el-input-prefix">
                  <el-button slot="prepend">电话</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="school">
                <el-input type="text" v-model.trim="onePerson.school" disabled  size="large" class="el-input-prefix">
                  <el-button slot="prepend">本科毕业院校</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="english">
                <el-input type="text" v-model.trim="onePerson.english" disabled  size="large" class="el-input-prefix">
                  <el-button slot="prepend">英语水平</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="computer">
                <el-input type="text" v-model.trim="onePerson.computer" disabled  size="large" class="el-input-prefix">
                  <el-button slot="prepend">计算机水平</el-button>
                </el-input>
              </el-form-item>
            <el-form-item>
              <div class="tag-group">
                <span class="tag-group_titile" style="font-size: 18px; margin-right: 10px;"><i class="el-icon-user-solid"></i>意向导师</span>
                <el-tag style="margin-left: 10px;" v-for="item in selectTeachers" :key="item.teacher_name" type="success" effect="dark">
                  {{ item.teacher_name }}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item prop="school">
              <h1>考研成绩</h1>
              <el-input v-for='(item,index) in onePerson.transcript' disabled :key='index'
              type="text" :value="item.grade" size="large" class="el-input-prefix">
                <el-button slot="prepend">{{item.course}}</el-button>
              </el-input>
            </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-tag type="warning" :style="tagStyle">科研经历</el-tag>
          </el-col>
          <el-col :span="22">
            <el-input type="textarea" disabled :autosize="{ minRows: 3, maxRows: 10}" placeholder="无"
              v-model="onePerson.searchExperience">
            </el-input>
          </el-col>
          <el-col :span="24">
            <el-tag type="warning" :style="tagStyle">学生工作经历</el-tag>
          </el-col>
          <el-col :span="22">
            <el-input type="textarea" disabled :autosize="{ minRows: 3, maxRows: 10}" placeholder="无"
              v-model="onePerson.studentExperience">
            </el-input>
          </el-col>
          <el-col :span="24">
            <el-tag type="warning" :style="tagStyle">荣誉及获奖情况</el-tag>
          </el-col>
          <el-col :span="22">
            <el-input type="textarea" disabled :autosize="{ minRows: 3, maxRows: 10}" placeholder="无"
              v-model="onePerson.honor">
            </el-input>
          </el-col>
          <el-col :span="24">
            <el-tag type="warning" :style="tagStyle">个人兴趣爱好</el-tag>
          </el-col>
          <el-col :span="22">
            <el-input type="textarea" disabled :autosize="{ minRows: 3, maxRows: 10}" placeholder="无"
              v-model="onePerson.interest">
            </el-input>
          </el-col>
          <el-col :span="24">
            <el-tag type="warning" :style="tagStyle">其他</el-tag>
          </el-col>
          <el-col :span="22">
            <el-input type="textarea" disabled :autosize="{ minRows: 3, maxRows: 10}" placeholder="无"
              v-model="onePerson.other">
            </el-input>
          </el-col>
          <el-col :span="24">
            <el-tag type="warning" :style="tagStyle">本科成绩单</el-tag>
          </el-col>
          <el-col :md="10" :sm="12" :xs="24" v-for="(itemUrl) in undergraduateGrade" :key="itemUrl">
            <el-card :body-style="{ padding: '0px' }">
              <img :src='httpUrl+"/masterImg/"+itemUrl' style="width: 100%;" @click="handlelargeImg(itemUrl)"/>
              <div style="text-align: center;font-size: 18px; color: #909090;">
               本科成绩单
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <footerComponent></footerComponent>
    <el-dialog :visible.sync="dialogVisibleImg" width="80%">
      <img width="100%" :src="dialogImageUrl" alt="">
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
      footerComponent,
      headerComponent
    },
    data() {
      return {
        dialogVisibleImg:false,
        dialogImageUrl:'',
        tagStyle:{
          'margin-top':"10px",
          'margin-bottom':'10px',
          'font-size':'20px',
        },
        httpUrl,
        teacherList: '',
        reponseArray: '',
        currentPage: 1,
        onePerson: ''
      }
    },
    computed: {
      undergraduateGrade(){
        if(this.onePerson.undergraduateGrade){
          return this.onePerson.undergraduateGrade
        }
        return ['0']
      },
      selectTeachers() {
        if (this.onePerson) {
          return this.onePerson.teacherId.map((item) => {
            return this.teacherList[item-1]
          })
        }
        return []
      },
      tmpArray() {
        if (this.reponseArray) {
          var startIndex = (this.currentPage - 1) * this.pageSize;
          var endIndex = this.currentPage * this.pageSize;
          this.onePerson = this.reponseArray.slice(startIndex, endIndex)[0]
          return this.reponseArray.slice(startIndex, endIndex);
        } else {
          return []
        }
      },
      pageSize() {
        if (window.innerHeight <= 650) {
          return 6
        } else if (window.innerHeight <= 1000) {
          return 10
        } else {
          return 12
        }
      },
      handleSinglePage() {
        if (this.reponseDataCount <= this.pageSize) {
          return true
        } else {
          return false
        }
      },
      reponseDataCount() {
        return this.reponseArray ? this.reponseArray.length : 0;
      },
    },
    methods: {
      handlelargeImg(filename){
        console.log("11")
        this.dialogVisibleImg=true
        this.dialogImageUrl=this.httpUrl+"/masterImg/"+filename
      },
      handlecurrentPage(val) {
        this.currentPage = val
      },
      handleOnePersonSelect(selectMenu) {
        let showIndex = this.$refs.selectMenu.activeIndex
        this.onePerson = this.tmpArray.length != 0 ? this.tmpArray[showIndex] : '';
      }
    },
    beforeMount() {
      // this.$http.get(httpUrl+"/profile").then(
      //       (reponse)=>{
      //         if(reponse.body.errCode){ //后端数据库连接失败
      //             this.$router.push({name:"errorPage",params:{errorMessage:reponse.body}})
      //             return
      //           }
      //           if(reponse.body.authenticateThrought=="no"){
      //             this.$message({
      //               showClose: true,
      //               message: '没有权限访问，请登录后重试!',
      //               type: 'error',
      //             });
      //             setTimeout(()=>(this.$router.push({name:"loginPage"})),2000)
      //             return
      //           }
      //           if(reponse.body.authenticateThrought==="yes"){
      //             this.isLogin=true;
      //           }
      //       },
      //       (errReponse)=>{
      //         this.$message({
      //               showClose: true,
      //               message: '服务器开小差啦，请稍后重试!',
      //               type: 'error',
      //             });
      //           return
      //       }
      //     )
      this.$http.get(httpUrl + "/teacher").then(
        //success reponse
        (reponse) => {
          if (reponse.body.errCode) {
            //后台出错了
            this.$router.push({ name: "errorPage", params: { "errorMessage": reponse.body } });
            return
          }
          this.teacherList = reponse.body;
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
    this.$http.get(httpUrl+'/master/show').then(
      (reponse)=>{
        this.reponseArray=reponse.body
      },
      (reponse)=>{

      },
    )
    },
  }
</script>
<style scoped>
  #messageShow {
    height: 100%;
  }

  .el-header,
  .el-footer {
    background-color: #2f3640;
  }

  .el-header .el-row {
    color: aliceblue;
  }

  .el-aside {
    color: #333;
    text-align: center;
    overflow-y: hidden;
    border-right: solid 1px #e6e6e6;
  }

  .container {
    height: 80%;
  }
</style>