<template>
<el-header  :height="height">
  <el-row  type="flex" >
  <el-col  :md="9"  :xs="24" :sm="24" :offset="3">
    <div id="logo"><span>Bioinformatic of Cotton</span></div>
  </el-col>
  <el-col class="hidden-sm-and-down" :span="8" :offset="4" >
  <el-menu :default-active="activeIndex" mode="horizontal"
    text-color="#fff" active-text-color="#ffd04b" >
    <el-menu-item index="1"><router-link to="/"><el-button icon="el-icon-s-home" round>Home</el-button></router-link></el-menu-item>
    <el-menu-item index="2" v-if="!isLogin"><router-link to="/login"><el-button  icon="el-icon-s-promotion" round>Login</el-button></router-link></el-menu-item>
    <el-menu-item index="3" v-if="isLogin">
    <el-popover placement="bottom"
    trigger="hover">
    <el-row>
      <el-col :span="10"><el-button type="success">用户中心</el-button></el-col>
      <el-col :span="4"><el-divider direction="vertical"></el-divider></el-col>
      <el-col :span="10"><el-button type="danger">退出登录</el-button></el-col>
    </el-row >
   <span slot="reference"><i class="el-icon-user-solid"></i>
   <span style="color:#606266">{{$route.params.name}}</span><i class="el-icon-arrow-down el-icon--right"></i></span>
    </el-popover>
  </el-menu-item>
 </el-menu>
</el-col>
  </el-row>
</el-header>
</template>
<script>
export default {
  props:{
    activeIndex:{},
    height:{
      default:"10%",
    },
    isLogin:{
      default:false,
    },
  },
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
  justify-content:center;

}
#logo span{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  color: aliceblue;
  font-size: 25px;
}

</style>