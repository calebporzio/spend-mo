<template>
  <div>
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
</template>

<script>
import Store from '../store.js'

export default {
  data () {
    return {
      store: Store,
      categories: null
    }
  },

  ready() {
    firebase.database().ref('/category').once('value').then(snapshot => {
      this.categories = snapshot.val()
    })
  },

  methods: {
    selectCategory(key) {
      this.store.state.category = key;

      this.store.addTransaction()
        .then(() => {
          this.$router.go('/add-amount')
        })
    }
  }
}
</script>

<style scoped> 
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
