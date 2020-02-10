
import VueRouter from 'vue-router'
import indexPage from "./../components/pages/index.vue"
import showDataPage from "./../components/pages/showData.vue"
import errorPage from "./../components/pages/error.vue"
import loginPage from "./../components/pages/login.vue"
import profilePage from "./../components/pages/profile.vue"
var router=new VueRouter({
  routes:[
    {path:"/",component:indexPage,name:"home",meta:{title:"GCGI(Group of Cotton Genetic Improvement)"}},
    {path:"/show",name:"showData",component:showDataPage,
    props:(route)=>({reponsData:route.params.reponsData}),
    meta:{title:"Data show"}
  },
    {path:"/error",name:"errorPage",component:errorPage,
    props:(route)=>({errorMessage:route.params.errorMessage}),
    meta:{title:"error"}
  },
    {path:"/login",name:'loginPage',component:loginPage,meta:{title:"登录"}},
    {path:"/profile/:name",name:'profilePage',component:profilePage,
    props:(route)=>({pageShow:route.params.pageShow}),
    meta:{title:"个人主页"}},
    ]  
  
  
})
export default router