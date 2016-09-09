<template>

  <div class="content-padded">
    <form @submit.prevent="register">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>

      <input type="email" placeholder="Email" autofocus v-model="email">
      <input type="password" placeholder="Password" autofocus v-model="pass">
      <button class="btn btn-positive btn-block m-t-1">Register</button>
    </form>
    
    <p>
      Already have an account? <a v-link="'/login'">Login</a>
    </p>
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
    register() {
      this.clearErrors();
      firebase.auth().createUserWithEmailAndPassword(this.email, this.pass)
        .then(() => {
          console.log('Signed Up!')
        })
        .catch(error => {
          console.log(error.code)
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
.register {
  max-width: 400px;
  margin: auto;
}
</style>
