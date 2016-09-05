<template>
  <div>
    <div class="categories" v-if="categories">
      <a class="bg-primary" href="#" v-for="(index, cat) in categories" @click.prevent="selectCategory(index)">
        <div>
          <span><i class="fa fa-fw {{ cat['fa-icon'] }}"></i></span>
        </div>
      </a>
    </div>
    <div class="text-xs-center text-primary m-t-3" v-else>
      <h1><i class="fa fa-circle-o-notch fa-spin"></i></h1>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      this.$router.go('add-amount/' + key)
    }
  }
}
</script>

<style scoped> 
  .categories {
    margin: auto;
    max-width: 600px;
    text-align: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  } 

  .categories a {
    color: #fff;
    width: 100px;
    height: 100px;
    font-size: 3rem;
    border: 1px solid rgba(120,90,90,0.3);
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .categories a div {

  }
</style>
