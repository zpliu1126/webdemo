
import VueRouter from 'vue-router'
import indexPage from "./../components/pages/index.vue"
import showDataPage from "./../components/pages/showData.vue"
import errorPage from "./../components/pages/error.vue"
var router=new VueRouter({
  routes:[
    {path:"/",component:indexPage,},
    {path:"/show/",name:"showData",component:showDataPage,props:(route)=>({reponsData:route.params.reponsData})},
    {path:"/error",name:"errorPage",component:errorPage,props:(route)=>({errorMessage:route.params.errorMessage})},
    ]  
  
  
})
export default router