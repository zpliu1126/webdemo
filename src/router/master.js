import VueRouter from 'vue-router'
import masterInfoPage from "./../components/pages/masterInfo.vue"
import loginPage from "./../components/masterComponents/login.vue"
import showPage from "./../components/masterComponents/show.vue"
import errorPage from "./../components/pages/error.vue"
var router = new VueRouter({
  routes: [
    { path: "/", component: masterInfoPage, name: "home", meta: { title: "GCGI(Group of Cotton Genetic Improvement)" } },
    { path: "/login", name: 'loginPage', component: loginPage, meta: { title: "登录" } },
    {
      path: "/show/:name", name: 'showPage', component: showPage,
      props: (route) => ({ pageShow: route.params.pageShow }),
      meta: { title: "信息展示" }
    },
    {
      path: "/error", name: "errorPage", component: errorPage,
      props: (route) => ({ errorMessage: route.params.errorMessage }),
      meta: { title: "error" }
    },
  ]
})

export default router