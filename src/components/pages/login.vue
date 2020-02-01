<template>
  <div id="loginContainer">
    <headerComponents active-index="2"></headerComponents>
    <el-row :span="24" justify="center" type="flex">
      <el-col :span="24">
        <el-form status-icon ref="input">
          <el-form-item>
            <el-input size="large" type="text">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="rule">
            <el-input size="large" type="text">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <footerComponents></footerComponents>
  </div>
</template>
<script>
  import headerComponents from "./../header.vue"
  import footerComponents from "./../footer.vue"
  export default {
    components: {
      headerComponents,
      footerComponents,
    }
  }
</script>
<style scoped>
  #loginContainer {
    position: absolute;
    top: 0px;
    bottom: 0px;
    height: 100%;
    width: 100%;
    margin-left: 0px;
    background: rgb(41, 45, 62) url(http://cotton.hzau.edu.cn/primer/public/img/20190921231830.svg);
    background-repeat: repeat;
    background-size: cover;
    border-top: 1px solid red;
  }

  #loginContainer .el-row {
    height: 70%;
    align-items: center;
  }

  #loginContainer .el-row .el-col {
    display: inherit;
    justify-content: center;
  }


 
</style>