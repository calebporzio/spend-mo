<template>
  <div class="content-padded">
    <form @submit.prevent="login">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>

      <input type="email" placeholder="Email" autofocus v-model="email">
      <input type="password" placeholder="Password" autofocus v-model="pass">

      <button class="btn btn-positive btn-block m-t-1">Login</button>
    </form>
    
    <a v-link="{ path: '/register', activeClass: 'active' }" class="pull-right">Register</a>
    <a href="#">Forgot Password?</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      pass: '',
      error: null,
    }
  },

  methods: {
    login() {
      this.clearErrors();
      firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
        .then(() => {
          console.log('Logged In!')
        })
        .catch(error => {
          this.showError(error.message)
      });
    },

    showError(errorMessage) {
      this.error = errorMessage
    },

    clearErrors() {
      this.errors = null
    }
  }
}
</script>

<style scoped>

.login {
  max-width: 400px;
  margin: auto;
}
</style>
