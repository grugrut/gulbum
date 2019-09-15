<template>
  <div>
    Googleアカウントでログイン<br>
    <b-button @click="googleLogin">Login</b-button>
  </div>
</template>

<script>
 import firebase from 'firebase/app'
 import router from '../router'
 
 export default {
   name: 'singin',
   created() {
     firebase.auth().getRedirectResult().then(function(result) {
       if (result.credential) {
         router.push('/');
       }
     }).catch(function(error) {
       console.log(error.message);
     });
   },
   methods: {
     googleLogin() {
       const provider = new firebase.auth.GoogleAuthProvider();
       firebase.auth().signInWithPopup(provider);
     }
   }
 }
</script>
