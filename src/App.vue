<template>
  <div id="app">
    
    <div class="navbar navbar-full navbar-dark bg-primary" v-if="$route.auth">
      
      <span class="navbar-brand">
        <total></total>
      </span>
      
      <nav class="nav navbar-nav">
        <a class="nav-item nav-link" v-link="'/select-category'" v-if="$route.name == 'add-amount'"><i class="fa fa-angle-left"></i></a>

        <a class="nav-item nav-link" v-link="{ path: '/logout', activeClass: 'active' }">Logout</a>
      </nav>

    </div>

    <div class="navbar navbar-full navbar-dark bg-primary" v-else>
      <a class="navbar-brand" v-link="/">Spend-mo</a>

      <nav class="nav navbar-nav" v-else>
        <a class="nav-item nav-link" v-link="{ path: '/login', activeClass: 'active' }">Login</a>
      
        <a class="nav-item nav-link" v-link="{ path: '/register', activeClass: 'active' }">Register</a>
      </nav>
    </div>

    <router-view></router-view>

  </div>
</template>

<script>
import Total from './components/total'

export default {
  components: {
    total: Total
  },

  ready() {
    //
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  background: #FFF9F3;
  height: 100%;
}

.navbar {
  display: flex;
  justify-content: space-between;
}

.navbar::after {
    content: none;
    display: none;
    clear: none;
}
</style>
