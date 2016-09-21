<template>
  <div>
    <span v-if="total != null">${{ total }}</span>
    <span v-else><i class="fa fa-circle-o-notch fa-spin"></i></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: null,
    }
  },

  ready() {
      this.updateTotal();
  },

  methods: {
    updateTotal() {
      let userId = firebase.auth().currentUser.uid;
      let transactionsRef = firebase.database().ref('transactions/' + userId +  '/' + (new Date).getMonth()+'-'+(new Date).getFullYear())
      transactionsRef.on('value', snapshot => {
        this.total = _.reduce(snapshot.val(), (memo, tran) => {
          let add = Number(tran.amount) || 0
          return memo + add
        }, 0).toFixed(2)
      })
    }
  }
}
</script>

<style>

</style>
