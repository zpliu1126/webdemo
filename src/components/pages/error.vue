<template>
  <div class="content">
    <img src="http://127.0.0.1/public/emojious/Emojious-codrops/SVG/sun.svg" width="25%" height="20%" alt="">
    <div class="errMessage">
      <h1>Somethings get wrong!</h1>
      <p><span class="tip">error code:</span> <span>{{errorMessage.errCode}}</span></p>
      <p><span class="tip">erroe Message:</span> <span>{{errorMessage.errMessage}}</span></p>
      <div class="contact">
        <p>Please contact to the Web Administartor and send this error Code:<span>{{errorMessage.email}}</span></p> 
      </div>
    </div>
  </div>

</template>
<script>
export default {
  props:["errorMessage"],
}
</script>
<style scoped>
body{
      background-color: #ecf0f1;
    }
    .content{
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
    }
    img{
      flex-basis:auto;
    }
    .errMessage{
      align-self: center;
    }
    .errMessage h1{
      font-family:'Times New Roman', Times, serif;
      font-size: 45px;
    }
    .errMessage .tip{
      font-size: 20px;
      margin-right: 10px;
      background-color:#e74c3c ;
    }
</style>