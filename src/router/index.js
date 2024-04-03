import Vue from 'vue'
import VueRouter from 'vue-router'

import AppShow from '@/views/LayOut/AppShow'
import home from '@/views/LayOut/AppHome'
import classify from '@/views/LayOut/Classify'
import cart from '@/views/LayOut/carts'
import user from '@/views/LayOut/User'

const login = () => import('@/views/login')
const pay = () => import('@/views/PayMoney')
const order = () => import('@/views/MyOrder')
const store = () => import('@/store')
const prodetail = () => import('@/views/prodetail')
const search = () => import('@/views/Search')
const searchlist = () => import('@/views/SearchList')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/pay',
    component: pay
  },
  {
    path: '/myorder',
    component: order
  },
  {
    path: '/prodetail/:id',
    component: prodetail
  },
  {
    path: '/search',
    component: search
  },
  {
    path: '/searchlist',
    component: searchlist
  },
  {
    path: '/',
    redirect: '/home',
    component: AppShow,
    children: [
      { path: 'home', component: home },
      { path: 'classify', component: classify },
      { path: 'cart', component: cart },
      { path: 'user', component: user }
    ]
  }
]

const router = new VueRouter({
  routes
})

const authUrls = ['/pay', '/order', '/myorder']

router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
    return
  }

  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
