<template>
  <div class="add-amount">

    <h1 class="text-primary text-xs-center">{{ amount }}</h1>

    <div class="numbers">
      <a class="btn btn-outline-primary text-primary" @click="press(1)">1</a>
      <a class="btn btn-outline-primary text-primary" @click="press(2)">2</a>
      <a class="btn btn-outline-primary text-primary" @click="press(3)">3</a>
      <a class="btn btn-outline-primary text-primary" @click="press(4)">4</a>
      <a class="btn btn-outline-primary text-primary" @click="press(5)">5</a>
      <a class="btn btn-outline-primary text-primary" @click="press(6)">6</a>
      <a class="btn btn-outline-primary text-primary" @click="press(7)">7</a>
      <a class="btn btn-outline-primary text-primary" @click="press(8)">8</a>
      <a class="btn btn-outline-primary text-primary" @click="press(9)">9</a>
      <a class="btn btn-outline-primary text-primary" >&nbsp</a>
      <a class="btn btn-outline-primary text-primary" @click="press(0)">0</a>
      <a class="btn btn-outline-primary text-primary" @click="press('.')">.</a>

      <button class="btn btn-primary btn-lg m-t-1" @click="add">Add Amount</button>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      amount: ''
    }
  },

  ready() {
    //
  },

  methods: {
    press(number) {
      this.amount += String(number);
    },

    add() {
      let userId = firebase.auth().currentUser.uid;
      var newTransactionKey = firebase.database().ref().child('transactions').push().key;

      let transactionData = {
        amount: this.amount,
        category: this.$route.params.category
      }

      let updates = {}

      updates['transactions/' + userId + '/' + (new Date).getMonth() + '/' + newTransactionKey] = transactionData

      firebase.database().ref().update(updates)
        .then(() => {
          this.$router.go('/select-category')
        })

      this.amount = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-size: 6rem;
  }

  .numbers {
    margin: auto;
    max-width: 400px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }
  
  .numbers a {
    width: 100px;
    margin: 15px;
    font-size: 3rem;
  }
</style>
