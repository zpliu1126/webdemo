<template>
  <el-footer :height="height">
    <el-divider></el-divider>
    <el-row :span="24" justify="center">
      <el-col :span="20" :offset="2">
        <div>Copyright &copy; 2019~2020 Group of Cotton Genetic Improvement</div>
      </el-col>
      <el-col :span="20" :offset="2">
        <div>{{stateMent.right}}</div>
      </el-col>
    </el-row>
  </el-footer>
  
</template>
  <script>
    var stateMent={
      right:"Huazhong Agricultural University. All rights reserved."
    }
  export default {
    props:{
      height:{
        default:"15%",
      },
    },
    data() {
      return {
        "stateMent":stateMent
      }
    },
  }
  </script>
  <style scoped>
    .el-footer{
      margin-bottom: 10px;
    }
    .el-footer .el-row{
      text-align: center;
      color: aliceblue;
    }
    .el-footer .el-row > .el-col{
     margin-bottom: 10px;
    }
    .el-footer .el-col:last-child{
      margin-bottom: 0px;
      padding-bottom: 10px;
    }
  </style>