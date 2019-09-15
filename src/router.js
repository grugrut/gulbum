import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './views/Signin.vue'
import firebase from 'firebase'
//import auth from './utils/auth.js'

Vue.use(Router)

const isLogin = (user) => {
  var db = firebase.firestore();
  if (user.uid) {
    var docRef = db.collection("allowed_users").doc(user.uid);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        return true;
      } else {
        db.collection("allowed_users").doc(user.email).get().then(function(doc) {
          if (doc.exists) {
            db.collection("users").doc(user.uid).set({
              name: user.displayName
              });
            return true;
          }
        })
      }
    }).catch (function(error) {
      console.log(error);
    });
  }
  return;
}

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
router.beforeEach((to, from, next) => {
  if (to.path === '/signin') {
    next();
  } else {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (isLogin(user)) {
          next();
        }
      }
      next({path: '/signin', query: {redirect: to.fullPath}})
    })
  }
})

export default router
  
