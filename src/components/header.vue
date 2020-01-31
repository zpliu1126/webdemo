<template>
<el-header  height="10%">
  <el-row :span="24" type="flex" >
  <el-col :span="9" :md="9"  :xs="24" :sm="24" :offset="3">
    <div id="logo"><span>Bioinformatic of Cotton</span></div>
  </el-col>
  <el-col class="hidden-sm-and-down"  :span="8" :offset="4" >
  <el-menu :default-active="activeIndex" mode="horizontal"
    text-color="#fff" active-text-color="#ffd04b" >
    <el-menu-item index="1"><router-link to="/"><el-button icon="el-icon-s-home" round>Home</el-button></router-link></el-menu-item>
    <el-menu-item index="2"><router-link to="/login"><el-button  icon="el-icon-s-promotion" round>Login</el-button></router-link></el-menu-item>
 </el-menu>
</el-col>
  </el-row>
</el-header>
</template>
<script>
export default {
  props:["activeIndex",],
}
</script>
<style scoped>
.el-menu::after, .el-menu::before{
  display: none;
  content: unset;
}
.el-menu.el-menu--horizontal{ 
  border: none; 
}

.el-header .el-row {
  height:100%;
  align-items: center;
  justify-content:center
}
#logo span{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  color: aliceblue;
  font-size: 20px;
}

</style>