<template>
  <div class="login m-t-3">
    <!-- Error Message -->
    <div class="alert alert-danger" v-if="error">
      {{ error }}
    </div>

    <!-- Email -->
    <input class="form-control m-b-1" type="text" v-model="email" placeholder="Email">
    
    <!-- Pass -->
    <input class="form-control m-b-2" type="password" v-model="pass" placeholder="Password">
  
    <!-- Login Button -->
    <button class="btn btn-primary btn-block" @click="login">Login</button>
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
