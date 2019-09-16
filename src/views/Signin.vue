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
   methods: {
     googleLogin() {
       const provider = new firebase.auth.GoogleAuthProvider();
       firebase.auth().signInWithPopup(provider).then(result => {
         var db = firebase.firestore();
         var user = result.user;
         if (user.uid) {
           db.collection('users').doc(user.uid).get().then(doc => {
             if (doc.exists) {
               this.$router.push('/');
             } else {
               db.collection("allowed_users").doc(user.email).get().then(function(doc) {
                 if (doc.exists) {
                   db.collection("users").doc(user.uid).set({
                     name: user.displayName
                   });
                   this.$router.push('/');
                 }
                 firebase.auth().signOut();
               }).catch (error => {
                 firebase.auth().signOut();
                 console.log(error);
               });
             }
           }).catch (error => {
             firebase.auth().signOut();
             console.log(error);
           });
         }
       }).catch (error => {
         firebase.auth().signOut();
         console.log(error);
       });
     }
   }
 }
</script>
