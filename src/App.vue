<template>
<router-view></router-view>
</template>
<script>
  export default{
  }
</script>
<style>
body{
  margin:0 0;
}
/*
登录界面时全局改变element-ui样式
*/
#loginContainer .el-input__prefix{
  left: 0px;
}
</style>