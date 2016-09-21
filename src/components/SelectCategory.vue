<template>
  <div>
    <div class="text-center text-primary" v-if="showAdded">
      <strong><h1 class="text-center">Added...</h1></strong>
      <h3>Now Stop Spending!</h1>
    </div>

    <div v-else>
      <div class="categories" v-if="categories">
        <a class="bg-primary" href="#" v-for="(index, cat) in categories" v-touch:tap="selectCategory(index)">
          <div>
            <span><i class="fa fa-fw {{ cat['fa-icon'] }}"></i></span><br>
          </div>
        </a>
      </div>
      <div class="text-xs-center text-primary m-t-3" v-else>
        <h1><i class="fa fa-circle-o-notch fa-spin"></i></h1>
      </div>
    </div>

  </div>
</template>

<script>
import Store from '../store.js'

export default {
  data () {
    return {
      showAdded: false,
      store: Store
    }
  },

  computed: {
    categories() {
      return _.mapValues(this.store.state.userCategories, (index, cat) => {
        return this.store.state.categories[cat]
      })
    }
  },

  methods: {
    selectCategory(key) {
      this.store.state.category = key;

      this.store.addTransaction()

      this.finishAdded();
    },

    finishAdded() {
      this.showAdded = true
      setTimeout(() => {
        this.$router.go('/add-amount')
      }, 1000);
    }
  }
}
</script>

<style scoped> 
  h1 {
    margin: 30px 0;
  }

  .categories {
    padding: 10px;
    margin: auto;
    text-align: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  } 

  .categories a {
    color: #fff;
    font-size: 3rem;
    border: 1px solid rgba(120,90,90,0.3);
    border-radius: 5px;
    box-sizing: border-box;
    margin: 10px;
    align-content: center;
    flex-direction: column;
    display: flex;
    flex-basis: 1;
    justify-content: center;
    width: 25vw;
    height: 25vw;
  }

  .categories a div {

  }
</style>
