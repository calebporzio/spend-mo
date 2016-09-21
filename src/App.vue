<template>

  <header class="bar bar-nav" v-if="store.ready && store.authenticated">
    <a class="back" @click="back" v-if="$route.name != 'add-amount' && $route.name != 'add-categories'"><i class="fa fa-chevron-left"></i></a>
    <a v-link="'/summary'" v-if="$route.name == 'add-amount'">Summary</a>

    <span>Spend-mo</span>
    <a v-link="'/logout'">Logout</a>
  </header>

  <header class="bar bar-nav" v-if="store.ready && !store.authenticated">
    <span>&nbsp</span>
    <span>Spend-mo</span>
    <span>&nbsp</span>
  </header>

  <div class="content" v-if="store.ready">
    <router-view></router-view>
  </div>

  <div class="text-center text-primary" v-else><h1><i class="fa fa-circle-o-notch fa-spin"></i></h1></div>

  <!-- <div style="display: none;">
    
    <div class="navbar navbar-full navbar-dark bg-primary" v-if="$route.auth">
      
      <span class="navbar-brand">
        <total></total>
      </span>
      
      <nav class="nav navbar-nav">
        <a class="nav-item nav-link" @click="back" v-if="$route.name != 'select-category'"><i class="fa fa-angle-left"></i></a>

        <a class="nav-item nav-link" v-link="{ path: '/summary', activeClass: 'active' }">Summary</a>

        
      </nav>

    </div>

    <div class="navbar navbar-full navbar-dark bg-primary" v-else>
      <a class="navbar-brand" v-link="/">Spend-mo</a>

      <nav class="nav navbar-nav" v-else>
        <a class="nav-item nav-link" v-link="{ path: '/login', activeClass: 'active' }">Login</a>
      
        <a class="nav-item nav-link" v-link="{ path: '/register', activeClass: 'active' }">Register</a>
      </nav>
    </div>

  </div> -->
</template>

<script>
import Total from './components/Total'
import Store from './store.js'

export default {
  replace: false,

  data() {
    return {
      store: Store
    }
  },

  ready() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user = user
        this.store.init(() => {
          this.store.authenticated = true;
          this.$router.go('/add-amount')
        });
      } else {
        user = null
        this.store.ready = true;
        this.store.authenticated = false;
        this.$router.go('/login')
      }
    });
  },

  methods: {
    back() {
      setTimeout(() => {
        this.$router.go(window.history.back())
      }, 300)
    }
  }
}
</script>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .back {
      padding: 0 20px;
    }
  }
</style>
