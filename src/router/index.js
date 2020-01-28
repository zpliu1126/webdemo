
import VueRouter from 'vue-router'
import indexPage from "./../components/pages/index.vue"
import showDataPage from "./../components/pages/showData.vue"
var router=new VueRouter({
  routes:[
    {path:"/",component:indexPage,
    children:[
      {path:"show",component:showDataPage}
    ]  
  }
  ]
})
export default router