import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './views/Signin.vue'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    }
  ]
})
router.beforeResolve((to, from, next) => {
  if (to.path == '/signin') {
    next()
  } else {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next()
      } else {
        next({path: '/signin'})
      }
    })
  }
})

export default router
