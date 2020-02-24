<template>
  <el-container   direction="vertical">
    <div class="stars">
    <div class="star" ref="star"  v-for="(item,index) in starsCount" :key="index"></div>
    </div>
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
    data() {
      return {
      starsCount: 500,
      distance: 500,
      }
    },
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
    mounted(){
        let _this = this;
        // 原生js
        let _starList = document.getElementsByClassName("star")
        let starArr = Array.prototype.slice.call(_starList)
        // vue
        let starList = this.$refs.star
        // 遍历添加样式
        starArr.forEach(item => {
            var s = 0.2 + (Math.random() * 1);
            var thisDistance = _this.distance + (Math.random() * 300);
            item.style.transformOrigin = `0 0 ${thisDistance}px`
            item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * -50)}deg) scale(${s},${s})`
        })
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
    /* background-image: url(https://imgchr.com/content/images/system/home_cover_1552414407320_3a5f92.jpg);
    background-repeat: repeat;
    background-size: cover; */
    background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #75517d, #1b2947);
    background: radial-gradient(220% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%, #f8c291);
    background-attachment: fixed;
    overflow: hidden;
  }
  @keyframes rotate {
            0% {
                transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
            }
            100% {
                transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
            }
        }
        .stars {
            transform: perspective(500px);
            transform-style: preserve-3d;
            position: absolute;
            bottom: 0;
            perspective-origin: 50% 100%;
            left: 50%;
            animation: rotate 90s infinite linear;
        }
        .star {
            width: 2px;
            height: 2px;
            background: #F7F7B6;
            position: absolute;
            top: 0;
            left: 0;
            transform-origin: 0 0 -300px;
            transform: translate3d(0, 0, -300px);
            backface-visibility: hidden;
        }
</style>