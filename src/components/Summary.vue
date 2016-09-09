<template>
  <div class="summary m-t-1">
    <div class="list-group" v-if="categories">

      <div class="list-group-item">
        <h3>
          <span>Total: </span>
          <span class="text-primary">${{ total }}</span>
        </h3>
      </div>

      <div class="list-group-item" v-for="(key, cat) in categories">
        <span>
          <i class="fa fa-fw {{ cat['fa-icon'] }}"></i>&nbsp
          ${{ categoryTotal(key) }}
        </span>
        <span><i class="fa fa-chevron-down"></i></span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: null,
      transactions: null
    }
  },

  ready() {
    this.fetchTransactions()
    this.fetchCategories()
  },

  computed: {
    total() {
      return _.chain(this.transactions)
        .reduce((memo, tran) => {
          let add = Number(tran.amount) || 0
          return memo + add
        }, 0)
        .value().toFixed(2)
    }
  },

  methods: {
    categoryTotal(categoryKey) {
      return _.chain(this.transactions)
        .filter((tran) => {
          return tran.category == categoryKey
        }).reduce((memo, tran) => {
            let add = Number(tran.amount) || 0
            return memo + add
          }, 0)
        .value().toFixed(2)
    },

    fetchTransactions() {
      let userId = firebase.auth().currentUser.uid;
      let transactionsRef = firebase.database().ref('transactions/' + userId +  '/' + (new Date).getMonth())
      transactionsRef.on('value', snapshot => {
        this.transactions = snapshot.val()
      })
    },

    fetchCategories() {
      let userId = firebase.auth().currentUser.uid;
      let categoryRef = firebase.database().ref('category')
      categoryRef.on('value', snapshot => {
        this.categories = snapshot.val()
      })
    }
  }
}
</script>

<style lang="scss"> 
  .summary {
    max-width: 600px;
    margin: auto;
    .list-group-item {
      display: flex;
      justify-content: space-between;
    }
  }

</style>
