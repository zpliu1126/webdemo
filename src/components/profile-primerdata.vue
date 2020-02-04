<template>
  <el-main>
  <el-row class="result" :span="24">
    <el-table :data="tableReponsData" border style="width: 100%">
      <el-table-column fixed prop="subscriber" label="订购人" width="100">
      </el-table-column>
      <el-table-column fixed prop="teacher" label="课题组老师" width="100">
      </el-table-column>
      <el-table-column  prop="order_number" label="订单号" width="150">
      </el-table-column>
      <el-table-column  prop="secondID" label="二代基因编号" width="120">
      </el-table-column>
      <el-table-column  prop="thirdID" label="三代基因编号" width="120">
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
  <el-row class="result-page" >
    <el-pagination 
    :hide-on-single-page="handleSinglePage"
    :page-size="pageSize"
    @current-change="handlecurrentPage"
    layout="prev, pager, next" 
    background :total="reponseDataCount">
    </el-pagination>
  </el-row>
</el-main>
</template>
<script>  
 import confVar from './configure.js'
var httpUrl = confVar.httpUrl
export default{
  props:{
    input:{
      default:()=>({
      keyword:'\'\'',
      rule:'false'
    }),
    },
  },
  data() {
      return {
        reponsData:'',
        currentPage:1,
      }
    },
  methods: {
    requestByKeyword(formData){
      this.$http.post(httpUrl+"/",formData,{emulateJSON: true}).then(
        //success reponse
        (reponse)=>{
          if(reponse.errCode){
          //后台出错了
          this.$router.push({name:"errorPage",params:{"errorMessage":reponse}});
          return
          }
          this.reponsData=reponse.body; 
      },
      //failed reponse
      (reponse)=>{alert("somethings error!")})
    },
    handlecurrentPage(val) {
        this.currentPage=val
      }
  },
  created(){
    this.requestByKeyword(this.input)
  },
  computed: {
        tableReponsData(){
          var startIndex=(this.currentPage-1)*this.pageSize;
          var endIndex=this.currentPage*this.pageSize;
         if(this.reponsData){
          return this.reponsData.slice(startIndex,endIndex);
         }else{
           return []
         }
        },
        searchKeyword(){
          if(this.$route.params.searchKeyword){
            return this.$route.params.searchKeyword
          }else{
            return "No keyword is submit"
          }
        },
        reponseDataCount(){
          return this.reponsData ? this.reponsData.length:0;
        },
        handleSinglePage(){
            if(this.reponseDataCount<=this.pageSize){
              return true
            }else{
              return false
            }
        },
        pageSize(){
          if(window.innerHeight<=650){
            return 4
          }else if(window.innerHeight<=1000){
            return 7
          }else{
            return 8
          }
        }
    },
}
</script>
<style scoped>
  .el-main .result-page{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>