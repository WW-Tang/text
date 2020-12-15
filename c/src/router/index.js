import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import SearchList from '../views/SearchList.vue'
import bookrack from '../views/bookrack.vue'
import Ranking from '../views/Ranking.vue'
import xiangqingye from '../views/xiangqingye.vue'
import yuedubook from '../views/yuedubook.vue'
import Catalogue from '../views/Catalogue.vue'
import genduo from '../views/genduo.vue'
import Classify from '../views/Classify.vue'
import Classifycation from '../views/Classifycation.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: "/Search",
    component: Search,
  },
  {
    path: "/SearchList",
    component: SearchList,
  },
  {
    path: "/bookrack",
    component: bookrack,
  },
  {
    path: "/Ranking",
    component: Ranking,
  },
  {
    path: "/xiangqingye",
    component: xiangqingye,
  },
  {
    path: "/yuedubook",
    component: yuedubook,
  },
  {
    path: "/Catalogue",
    component: Catalogue,
  },
  {
    path: "/genduo",
    component: genduo,
  },
  {
    path: "/Classify",
    component: Classify,
  },
  {
    path: "/Classifycation/:id",
    component: Classifycation,
  },
  
  // {
  //   path: "*",
  //   component: yuedubook,
  // },
]

const router = new VueRouter({
  routes
})

export default router
