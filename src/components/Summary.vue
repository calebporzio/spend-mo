<template>
  <div class="summary">
    
    <h1 class="total text-center text-primary">${{ total }}</h1>

    <accordion type="info">

      <panel type="primary" v-for="(key, cat) in categories">
        <strong slot="header"> 
          <span>
            <i class="fa fa-fw {{ cat['fa-icon'] }}"></i>&nbsp
            ${{ categoryTotal(key) }}
          </span>
          <span class="pull-right"><i class="fa fa-chevron-down"></i></span>
        </strong>

        <div class="list-group">
          <div class="list-group-item" v-for="(transactionKey, tran) in getTransactions(key)">
            <span>${{ tran.amount }}</span>
            <span class="text-muted">{{ getDate(tran.time) }}</span>
            <a class="pull-right text-danger" v-touch:tap="remove(transactionKey)"><i class="fa fa-minus-circle"></i></a>
          </div>
        </div>
          
      </panel>

    </accordion>

    <div style="display: none;" class="list-group" v-if="categories">

      <div class="list-group-item">
        <h3>
          <span>Total: </span>
          <span class="text-primary">${{ total }}</span>
        </h3>
      </div>

    </div>
  </div>
</template>

<script>
import { accordion } from 'vue-strap'
import { panel } from 'vue-strap'
import Store from '../store.js'

export default {
  components: { 
    'accordion': accordion, 
    'panel': panel
 },

  data () {
    return {
      store: Store
    }
  },

  computed: {
    total() {
      return _.chain(this.store.state.transactions)
        .reduce((memo, tran) => {
          let add = Number(tran.amount) || 0
          return memo + add
        }, 0)
        .value().toFixed(2)
    },

    categories() {
      return _.mapValues(this.store.state.userCategories, (index, cat) => {
        return this.store.state.categories[cat]
      })
    }
  },

  methods: {
    getDate(time) {
      if (! time) {
        return ''
      }
      let date = new Date(time);
      return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
    },

    getTransactions(categoryKey) {
      return _.pickBy(this.store.state.transactions, (tran) => {
          return tran.category == categoryKey
        })
    },

    categoryTotal(categoryKey) {
      return _.chain(this.store.state.transactions)
        .filter((tran) => {
          return tran.category == categoryKey
        }).reduce((memo, tran) => {
            let add = Number(tran.amount) || 0
            return memo + add
          }, 0)
        .value().toFixed(2)
    },

    remove(transactionKey) {
      this.store.removeTransaction(transactionKey);
    },
  }
}
</script>

<style lang="scss"> 
  .summary {
    padding: 15px;
    max-width: 600px;
    margin: auto;
    .total {
      margin: 30px 0;
    }
    .list-group-item {
      display: flex;
      justify-content: space-between;
    }
  }

</style>
