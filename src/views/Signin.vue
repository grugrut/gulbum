<template>
  このページを参照するにはログインが必要です。
  <button v-on:click="googleLogin">Login</button>
</template>

<script>
 import firebase from 'firebase/app'
 import router from '../router'
 
 export default {
   name: 'singin',
   methods: {
     googleLogin() {
       const provider = new firebase.auth.GoogleAuthProvider()
       firebase.auth().signInWithPopup(provider).then(result => {
         alert(result)
         router.push('/')
       }).catch(error => {
         alert(error.message)
       })
     }
   }
 }
</script>
