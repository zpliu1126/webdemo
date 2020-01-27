<template>
  <el-container direction="vertical">
    <headerComponents></headerComponents>
    <mainComponents></mainComponents>
    <footerComponents></footerComponents>
  </el-container>
</template>
<script>
import mainComponents from "./../components/main.vue"
import footerComponents  from "./../components/footer.vue"
import headerComponents from "./../components/header.vue"
export default {
  data() {
    return {
      
    }
  },
  components:{
      mainComponents,
      footerComponents,
      headerComponents,
    }
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
    background-image: url(https://imgchr.com/content/images/system/home_cover_1552414407320_3a5f92.jpg);
    background-repeat: repeat;
    background-size: cover;
  }
  body > .el-container{

    height: 100%;
  }
</style>