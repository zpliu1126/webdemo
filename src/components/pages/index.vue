<template>
  <el-container  direction="vertical">
    <headerComponents active-index="1" ></headerComponents>
    <mainComponents v-on:seach-bykeword="onGetData"></mainComponents>
    <footerComponents></footerComponents>
  </el-container>
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
      onGetData(reponse){
        if(reponse.errCode){
          //后台出错了
          this.$router.push({name:"errorPage",params:{"errorMessage":reponse.body}});
        }else{
          //传递返回数据和关键字
          this.$router.push({name:"showData",params:{"reponsData":reponse.result,"searchKeyword":reponse.keyword}});
        }
      }
    },
  }
</script>
<style scoped>
  body > .el-container{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin-left: 0px;
  }
.el-container{
    height: 100%;
    background-image: url(https://imgchr.com/content/images/system/home_cover_1552414407320_3a5f92.jpg);
    background-repeat: repeat;
    background-size: cover;
  }
</style>