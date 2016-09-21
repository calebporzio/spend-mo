<template>
  <div class="add-categories content-padded">

    <div class="text-center text-muted">
      <h3>Add some categories.</h3>
    </div>

    <div class="categories">
      <a class="bg-primary" :class="{ 'selected': selected[index] }" v-for="(index, cat) in store.state.categories" v-touch:tap="select(index)">
        <div>
          <span><i class="fa fa-fw {{ cat['fa-icon'] }}"></i></span><br>
        </div>
      </a>
    </div>

    <button class="btn btn-primary btn-block btn-lg" v-touch:tap="addCategories">Continue</button>

  </div>
</template>

<script>
import Store from '../store.js'

export default {
  data () {
    return {
      store: Store,
      selected: {}
    }
  },

  ready() {
    //
  },

  methods: {
    select(key) {
      this.$set('selected.'+key, "true")
    },

    isSelected(key) {
      return this.selected.hasOwnProperty(key)
    },

    addCategories() {
      this.store.setCategories(this.selected)
      this.$router.go('add-amount');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h1 {
    font-size: 4rem;
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
    opacity: 0.5;
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
  
  .categories a.selected {
    opacity: 1;
  }
</style>
