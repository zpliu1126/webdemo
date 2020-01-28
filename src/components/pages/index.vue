<template>
<div class="container">
  <el-container  direction="vertical">
    <headerComponents></headerComponents>
    <mainComponents v-on:seach-bykeword="onGetData"></mainComponents>
    <footerComponents></footerComponents>
  </el-container>
  <router-view></router-view>
</div>
</template>
<script>
import mainComponents from "./../main.vue"
import footerComponents  from "./../footer.vue"
import headerComponents from "./../header.vue"
  export default{
    components:{
      mainComponents,
      footerComponents,
      headerComponents,
    },
    methods: {
      onGetData(result){
        console.log(result)
      }
    },
  }
</script>
<style>
 html{
    min-height: 100%;
    height: 100%;
  }
  body{
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    height: 100%;
  }
  body > .container{
    height: 100%;
  }
  .container .el-container{
    height: 100%;
    background-image: url(https://imgchr.com/content/images/system/home_cover_1552414407320_3a5f92.jpg);
    background-repeat: repeat;
    background-size: cover;
  }
</style>