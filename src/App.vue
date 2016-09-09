<template>

  <header class="bar bar-nav">
    <a v-link="'/summary'">Summary</a>
    <span>Spend-mo</span>
    <a v-link="'/logout'">Logout</a>
  </header>

  <div class="content">
    <router-view></router-view>
  </div>

  <div id="myModalexample" class="modal">
    <header class="bar bar-nav">
      <a class="icon icon-close pull-right" href="#myModalexample"></a>
      <h1 class="title">Modal</h1>
    </header>

    <div class="content">
      <p class="content-padded">The contents of my modal go here. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.</p>
    </div>
  </div>

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
import Total from './components/total'

export default {
  replace: false,

  components: {
    total: Total
  },

  ready() {
    //
  },

  methods: {
    back() {
      this.$router.go(window.history.back())
    }
  }
}
</script>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
