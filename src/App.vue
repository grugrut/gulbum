<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">Gulbum</router-link>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expand="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            Home
          </a>
          <a class="navbar-item">
            About
          </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div v-if="user.uid">
              [{{ user.displayName }}]
              <a class="button is-primary" v-on:click="logout">
                Logout
              </a>
            </div>
            <div v-else>
              <a class="button is-primary" v-on:click="login">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container is-fluid">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
 import firebase from 'firebase'
 export default {
   data() {
     return {
       user: {}
     }
   },
   created() {
     firebase.auth().onAuthStateChanged(user => {
       this.user = user ? user : {}
     })
   },
   methods: {
     login() {
       const provider = new firebase.auth.GoogleAuthProvider()
       firebase.auth().signInWithPopup(provider)
     },
     logout() {
       firebase.auth().signOut()
     }
   }
 }
</script>

<style>
 #app {
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
 }
</style>>

