<template>
  <el-aside width="200px">
    <el-row>
      <el-col :span="24">
        <el-menu default-active="1">
          <el-menu-item index="1" @click="$emit('page-change','user')">
            <i class="el-icon-user-solid"></i>
            <span>用户中心</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>primer</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="$emit('page-change','primer')"><i class="el-icon-s-order"></i><span>我的订单</span></el-menu-item>
              <el-menu-item index="2-2"  @click="$emit('page-change','upload')"><i class="el-icon-folder"></i><span>上传</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3" disabled>
            <span>
              敬请期待...
            </span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
  export default{
    methods: {
      emitPage(){

      }
    },
  }
</script>

<style scoped>
  .el-aside {
    color: #333;
    text-align: center;
    overflow-y: hidden;
    border-right: solid 1px #e6e6e6;
  }

</style>