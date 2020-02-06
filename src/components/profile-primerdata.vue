<template>
  <el-main>
    <el-row>
      <el-col :xs="12" :sm="6" :span="6">
        <el-button type="warning" @click="handleUpdataPrimer">Update</el-button>
      </el-col>
      <el-col :xs="12" :sm="6" :span="6">
        <el-button type="danger" @click="handleDeletePrimer">Delete</el-button>
      </el-col>
    </el-row>
    <el-row class="result" :span="24">
      <el-table :data="tableReponsData" border style="width: 100%">
        <el-table-column fixed width="100">
          <template slot="header" slot-scope="scope">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">订购人
            </el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox-group v-model="checkList" @change="handleCheckeditemChange">
              <el-checkbox :label="scope.row.order_number" :key="scope.row.order_number">{{scope.row.subscriber}}
              </el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column fixed prop="teacher" label="课题组老师" width="100">
        </el-table-column>
        <el-table-column prop="order_number" label="订单号" width="150">
        </el-table-column>
        <el-table-column prop="secondID" label="二代基因编号" width="120">
        </el-table-column>
        <el-table-column prop="thirdID" label="三代基因编号" width="120">
        </el-table-column>
        <el-table-column prop="company" label="公司" width="120">
        </el-table-column>
        <el-table-column prop="sequence" label="sequence" width="200">
        </el-table-column>
        <el-table-column prop="GCContent" label="GC含量" width="200">
        </el-table-column>
        <el-table-column prop="TMValue" label="TM值" width="200">
        </el-table-column>
        <el-table-column prop="decoratePattern" label="修饰方式" width="200">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="result-page">
      <el-pagination :hide-on-single-page="handleSinglePage" :page-size="pageSize" @current-change="handlecurrentPage"
        layout="prev, pager, next" background :total="reponseDataCount">
      </el-pagination>
    </el-row>
    <el-dialog title="PrimerData" :visible.sync="dialogFormVisible">
      <el-form :model="updateForm">
        <el-form-item label="订购人" :label-width="formLabelWidth">
          <el-input v-model="updateForm.subscriber" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课题组老师" :label-width="formLabelWidth">
          <el-input v-model="updateForm.teacher" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="二代基因编号" :label-width="formLabelWidth">
          <el-input v-model="updateForm.secondID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="三代基因编号" :label-width="formLabelWidth">
          <el-input v-model="updateForm.thirdID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="updateForm.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="GC含量" :label-width="formLabelWidth">
          <el-input v-model="updateForm.GCContent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="TM值" :label-width="formLabelWidth">
          <el-input v-model="updateForm.TMValue" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancle</el-button>
        <el-button type="success" @click="handleUpdataBody">Update</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>
<script>
  import confVar from './configure.js'
  var httpUrl = confVar.httpUrl
  export default {
    props: {
      input: {
        default: () => ({
          keyword: '\'\'',
          rule: 'false'
        }),
      },
    },
    data() {
      return {
        reponsData: '',
        currentPage: 1,
        checkList: [],
        checkAll: false,
        isIndeterminate: true,
        dialogFormVisible: false,
        formLabelWidth: "80%"
      }
    },
    methods: {
      handleUpdataBody() {
        this.$http.post(httpUrl + "/update", this.updateForm, { emulateJSON: true }).then(
          //success reponse
          (reponse) => {
            console.log(reponse)
            if (reponse.body.update == 1) {
              //更新成功，后台请求数据进行更新
              this.dialogFormVisible = false;
              this.$message({
                showClose: true,
                message: '更新成功!',
                type: 'success',
              })
              //this.requestByKeyword(this.input) //响应式的所以不用再请求
              return
            }
            if (reponse.body.errCode) {
              //后台出错了
              this.$router.push({ name: "errorPage", params: { "errorMessage": reponse } });
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
          },
          //failed reponse
          (reponse) => {
            this.$message({
              showClose: true,
              message: '未知错误发生!',
              type: 'warning',
            });
          }
        )
      },
      handleCheckAllChange(val) {
        let allcheckData = this.reponsData.map((item) => (item['order_number']))
        this.checkList = val ? allcheckData : []
        this.isIndeterminate = false
      },
      handleCheckeditemChange(value) {
        let checkCount = value.length;
        this.checkAll = checkCount === this.reponsData.length;
        this.isIndeterminate = checkCount > 0 && checkCount < this.reponsData.length
      },
      requestByKeyword(formData) {
        this.$http.post(httpUrl + "/", formData, { emulateJSON: true }).then(
          //success reponse
          (reponse) => {
            if (reponse.errCode) {
              //后台出错了
              this.$router.push({ name: "errorPage", params: { "errorMessage": reponse } });
              return
            }

            this.reponsData=reponse.body
            
          },
          //failed reponse
          (reponse) => {
            this.$message({
              showClose: true,
              message: '未知错误发生!',
              type: 'warning',
            });
          })
      },
      handlecurrentPage(val) {
        this.currentPage = val
      },
      handleUpdataPrimer() {
        if (this.checkList.length > 1) {
          this.$message({
            showClose: true,
            message: '抱歉，一次只能更新单个条目',
            type: 'warning',
          });
          return
        }
        if (this.checkList.length == 0) {
          this.$message({
            showClose: true,
            message: '请先选择要更新的条目',
            type: 'warning',
          });
          return
        }
        this.dialogFormVisible = true;
      },
      handleDeletePrimer() {
        if (this.checkList.length == 0) {
          this.$message({
            showClose: true,
            message: '请先选择要删除的条目',
            type: 'warning',
          });
          return
        }
        this.$confirm('此操作将永久删除' + this.checkList.length + '项数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let deletJson = { 'deleteArry': this.checkList };
          this.$http.post(httpUrl + "/delete", deletJson, { emulateJSON: true }).then(
            //success reponse
            (reponse) => {
              if (reponse.body.errCode) {
                //后台出错了
                this.$router.push({ name: "errorPage", params: { "errorMessage": reponse } });
                return
              }
              if (reponse.body.authenticateThrought == "no") {
              this.$message({
                showClose: true,
                message: '抱歉! 没有权限操作登录后重试',
                type: 'error',
              });
              setTimeout(() => (this.$router.push({ name: "loginPage" })), 2000)
              return
            }
              this.checkList=[] //把依赖项目清空
              this.requestByKeyword(this.input) //重新请求接口渲染数据
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            },
            //failed reponse
            (reponse) => {
              this.$message({
                showClose: true,
                message: '未知错误发生!',
                type: 'warning',
              });
              return
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    created() {
      this.requestByKeyword(this.input)
    },
    computed: {
      tableReponsData() {
        var startIndex = (this.currentPage - 1) * this.pageSize;
        var endIndex = this.currentPage * this.pageSize;
        if (this.reponsData) {
          return this.reponsData.slice(startIndex, endIndex);
        } else {
          return []
        }
      },
      reponseDataCount() {
        return this.reponsData ? this.reponsData.length : 0;
      },
      handleSinglePage() {
        if (this.reponseDataCount <= this.pageSize) {
          return true
        } else {
          return false
        }
      },
      pageSize() {
        if (window.innerHeight <= 650) {
          return 4
        } else if (window.innerHeight <= 1000) {
          return 7
        } else {
          return 8
        }
      },
      updateForm() {
        if (this.checkList.length != 0) {
          return this.reponsData.filter((item) => (item.order_number == this.checkList[0]))[0]
        }
        return {} //防止出现undefined
      }
    },
  }
</script>
<style scoped>
  .el-main .result-page {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>