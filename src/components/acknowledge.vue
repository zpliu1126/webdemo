<template>
<div class="acknowledge">
  <el-row :style="iconWrap">
    <i class="el-icon-cold-drink" ></i>
   <el-link type="primary">Acknowledge</el-link>
   <el-divider></el-divider>
    </el-row>
    <el-row>
      <el-col :lg="24" :sm="24">
        <el-card>
          <img width="25%" :src="nodeUrl" alt="">
          <div>
            <el-link type="success">Node.js</el-link>
            <p>
              A JavaScript runtime built on Chrome's V8 JavaScript engine.
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="24" :sm="24">
        <el-card>
            <img width="15%"  :src="vueUrl" alt="">
            <div>
              <el-link type="success">Vue.js</el-link>
              <div>
                <p>
                  渐进式
                  JavaScript 框架
                </p>
              </div>
            </div>
        </el-card>
      </el-col>
      <el-col :lg="24" :sm="24">
        <el-card>
            <img width="25%"  :src="mysqlUrl" alt="">
            <div>
              <el-link type="success">mysql</el-link>
              <div>
                <p>
                  The most popular relational database management system
                </p>
              </div>
            </div>
        </el-card>
      </el-col>
      <el-col :lg="24" :sm="24">
        <el-card>
          <img :src="ElementUIUrl" alt="">
          <div>
            <el-link type="success">Element-UI</el-link>
            <p>
              基于 Vue 2.0 的桌面端组件库
            </p>
          </div>
        </el-card>
      </el-col>

    </el-row>
</div>
</template>
<script>
import confVar from './configure.js'
  var httpUrl = confVar.httpUrl
  export default{
    data() {
      let  ElementUIUrl=httpUrl+"/public/img/icon/element.svg";
      let  mysqlUrl=httpUrl+"/public/img/icon/mysql.jpg";
      let  vueUrl=httpUrl+"/public/img/icon/vue.png";
      let  nodeUrl=httpUrl+"/public/img/icon/node.svg";

      return {
        ElementUIUrl,
        mysqlUrl,
        vueUrl,
        nodeUrl,
        iconWrap:{
          "font-size":"2rem",
          "margin-top":"10px",
        }
      }
    },
  }
</script>
<style scoped>
</style>