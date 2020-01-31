<template>
  <el-container direction="vertical">
    <headerComponents height="10%"></headerComponents>
    <el-main>
      <el-row  class="result-keyword">
        <el-col :span="4"> <el-button class="el-icon-star-off" type="success" round>搜索关键字为:</el-button></el-col>
        <el-col :span="10"><el-button effect="dark" type="danger">{{searchKeyword}}</el-button></el-col>
      </el-row>
      <el-row class="result" :span="24">
        <el-table :data="reponsData" border style="width: 100%">
          <el-table-column fixed prop="order_number" label="订单号" width="150">
          </el-table-column>
          <el-table-column fixed prop="subscriber" label="订购人" width="150">
          </el-table-column>
          <el-table-column fixed prop="teacher" label="课题组老师" width="120">
          </el-table-column>
          <el-table-column fixed prop="secondID" label="二代基因编号" width="120">
          </el-table-column>
          <el-table-column fixed prop="thirdID" label="三代基因编号" width="120">
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
        <el-pagination @prev-click="handlePervPage" @next-click="handlenextPage" @current-change="handlecurrentPage"
          layout="prev, pager, next" background :total="50">
        </el-pagination>
      </el-row>
    </el-main>
    <footerComponents height="15%"></footerComponents>
  </el-container>
</template>
<script>
  import headerComponents from "./../header.vue"
  import footerComponents from "./../footer.vue"
  export default {
    props: ['reponsData'],
    components: {
      headerComponents,
      footerComponents
    },
    computed: {
        searchKeyword(){
          if(this.$route.params.searchKeyword){
            return this.$route.params.searchKeyword
          }else{
            return "No keyword is submit"
          }
        }
    },
    methods: {
      handlePervPage() {
        console.log("前一页")
      },
      handlecurrentPage(val) {
        alert(`当前页为${val}`) //获取当前页码
      },
      handlenextPage() {
        console.log("xia一页")
      }
    },
  }

</script>

<style scoped>
  body>.el-container {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin-left: 0px;
    background-color: #16a085;
  }

  .el-container>.el-main {
    height: 100%;
    width: 100%;
    position: relative;
    top: 0px;
    bottom: 0px;
  }
  .el-main .result-keyword{
   margin-bottom: 10px;
  }
  .el-main .result-page{
    display: flex;
    justify-content: center;
  }
</style>