<template>
  <el-container direction="vertical" id="messageShow">
    <headerComponent></headerComponent>
    <el-container class="container">
      <el-aside width="200px">
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
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img :src='httpUrl+"/masterImg/"+onePerson.imgUrl' style="width: 100%;" />
              <div>
                大头贴
              </div>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-form :model="onePerson" ref="infoOnePerson">
              <el-form-item prop="name">
                <el-input type="text" v-model.trim="onePerson.name" disabled size="large" class="el-input-prefix">
                  <el-button slot="prepend">姓名</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="sex">
                <el-input type="text" :value="onePerson.sex ? '女':'男' " disabled size="large" class="el-input-prefix">
                  <el-button slot="prepend">性别</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="tel">
                <el-input type="text" v-model.trim="onePerson.tel" size="large" class="el-input-prefix">
                  <el-button slot="prepend">电话</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="school">
                <el-input type="text" v-model.trim="onePerson.school" size="large" class="el-input-prefix">
                  <el-button slot="prepend">本科毕业院校</el-button>
                </el-input>
              </el-form-item>
            <el-form-item>
              <div class="tag-group">
                <span class="tag-group_titile">意向导师</span>
                <el-tag v-for="item in selectTeachers" :key="item.teacher_name" type="success" effect="dark">
                  {{ item.teacher_name }}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item prop="school">
              <h1>考研各科成绩</h1>
              <el-input v-for='(item,index) in onePerson.transcript' :key='index'
              type="text" :value="item.grade" size="large" class="el-input-prefix">
                <el-button slot="prepend">{{item.course}}</el-button>
              </el-input>
            </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-tag type="warning">科研经历</el-tag>
          </el-col>
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入内容"
              v-model="onePerson.searchExperience">
            </el-input>
          </el-col>
          <el-col :span="24">
            <el-tag type="warning">学生工作经历</el-tag>
          </el-col>
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入内容"
              v-model="onePerson.studentExperience">
            </el-input>
          </el-col>
          <el-col :span="24">
            <el-tag type="warning">荣誉及获奖情况</el-tag>
          </el-col>
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入内容"
              v-model="onePerson.honor">
            </el-input>
          </el-col>
          <el-col :span="24">
            <el-tag type="warning">个人兴趣爱好</el-tag>
          </el-col>
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入内容"
              v-model="onePerson.interest">
            </el-input>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <footerComponent></footerComponent>
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
        httpUrl,
        teacherList: '',
        reponseArray: '',
        currentPage: 1,
        onePerson: ''
      }
    },
    computed: {
      selectTeachers() {
        if (this.onePerson) {
          return this.onePerson.teacherId.map((item) => {
            return this.teacherList[item]
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
      handlecurrentPage(val) {
        this.currentPage = val
      },
      handleOnePersonSelect(selectMenu) {
        let showIndex = this.$refs.selectMenu.activeIndex
        this.onePerson = this.tmpArray.length != 0 ? this.tmpArray[showIndex] : '';
      }
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