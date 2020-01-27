import vueRouter from "vue-router"
import indexPage from "./../components/index.vue"

const router=new vueRouter({
  routes:[
    {path:'/',component:indexPage}
  ]
})
export default router