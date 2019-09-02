import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyBW5nj2OM-Bh5twfK4rBeyLm70FiggvhFo",
  authDomain: "gulbum.firebaseapp.com",
  databaseURL: "https://gulbum.firebaseio.com",
  projectId: "gulbum",
  storageBucket: "gulbum.appspot.com",
  messagingSenderId: "633029428409",
  appId: "1:633029428409:web:9ad990d0533d3f76"
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
