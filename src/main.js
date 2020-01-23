import Vue from 'vue'
import App from "./App.vue"

var template=`<App></App>`
var app=new Vue({
  el:"#app",
  data:{'a':1},
  template:template,
  components:{
    'App':App,
  }
})