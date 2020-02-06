<template>
<el-header  :height="height">
  <el-row  type="flex" >
  <el-col  :md="9"  :xs="4" :sm="4" class="hidden-md-and-up">
    <i style="color: aliceblue;font-size: 25px;" class="el-icon-s-operation"
    @click="drawer=true"
    ></i>
  </el-col>
  <el-col  :md="9"  :xs="20" :sm="20" >
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

 <el-drawer
  title="目录"
  :visible.sync="drawer"
  :direction="direction"
  :withHeader="false"
  size="60%"
  :modal="modal">
  <el-collapse v-model="activeNames" accordion >
    <el-collapse-item  name="1">
     <template slot="title">
     <span :style="menueCss"><i class="el-icon-s-home"></i>主页</span>
     </template>
     <el-tag type="info" style="width:100%"><router-link :style="menueCss" to="/">主页</router-link></el-tag>
     <el-tag type="info" style="width:100%"><router-link :style="menueCss" to="/login">登录</router-link></el-tag>
    </el-collapse-item>
    <el-collapse-item name="2"  >
     <template slot="title">
      <span :style="menueCss"><i class="el-icon-s-custom"></i>用户中心</span>
     </template>
     <el-tag type="info" style="width:100%;font-size: 22px;" @click="$emit('page-change','primer')">primer</el-tag>
    </el-collapse-item>
  </el-collapse>
</el-drawer>
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
  data() {
      return {
        drawer: false,
        direction: 'ltr',
        modal:true,
        activeNames:'',
        menueCss:{
          "font-size":"22px",
          "text-decoration": "none",    
        }
    }
  },
  computed: {

  },
  methods: {
    // hh(){
    //   console.log(this.$route)
    // }
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