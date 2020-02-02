import Vue from 'vue'
import ElementUI from 'element-ui'
import vueResourve from 'vue-resource'
import vueRouter from 'vue-router'

import "element-ui/lib/theme-chalk/index.css"
import 'element-ui/lib/theme-chalk/display.css';
import router from './router/index.js'
Vue.use(vueRouter)

import App from "./App.vue"


Vue.use(ElementUI)
Vue.use(vueResourve)

//title的设置
router.beforeEach(
  (to,from,next)=>{
    if(to.meta.title){
      document.title=to.meta.title
    }
    next();
  }
)

var template=`<App></App>`
var app=new Vue({
  el:"#app",
  data:{'a':1},
  render:h=>h(App),
  router:router, //mount router
})
