<template>
  <div class="register m-t-3">
    <!-- Error Message -->
    <div class="alert alert-danger" v-if="error">
      {{ error }}
    </div>

    <!-- Email -->
    <input class="form-control m-b-1" type="text" v-model="email" placeholder="Email">
    
    <!-- Pass -->
    <input class="form-control m-b-2" type="password" v-model="pass" placeholder="Password">
  
    <!-- Register Button -->
    <button class="btn btn-primary btn-block" @click="register">Register</button>
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
