<template>
  <div></div>
</template>

<script>
export default {
  ready() {
    this.logout()
  },

  methods: {
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.$router.go('/login')
        })
    }
  }
}
</script>
