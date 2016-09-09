<template>
  <div class="add-amount content-padded">

    <h1 class="text-primary text-xs-center m-y-3">
      $
      <span v-if="store.state.amount">{{ store.state.amount }}</span>
      <span v-else>0</span>
      <small class="text-muted" @click="clear" v-if="store.state.amount"><i class="fa fa-fw fa-close"></i></small>
    </h1>

    <div class="numbers">
      <div class="number btn btn-outlined btn-positive" v-touch:tap="press(1)">1</div>
      <div class="number btn btn-outlined btn-positive" v-touch:tap="press(2)">2</div>
      <div class="number btn btn-outlined btn-positive" v-touch:tap="press(3)">3</div>
      <div class="number btn btn-outlined btn-positive" v-touch:tap="press(4)">4</div>
      <div class="number btn btn-outlined btn-positive" v-touch:tap="press(5)">5</div>
      <div class="number btn btn-outlined btn-positive" v-touch:tap="press(6)">6</div>
      <div class="number btn btn-outlined btn-positive" v-touch:tap="press(7)">7</div>
      <div class="number btn btn-outlined btn-positive" v-touch:tap="press(8)">8</div>
      <div class="number btn btn-outlined btn-positive" v-touch:tap="press(9)">9</div>
      <div class="number btn btn-outlined btn-positive" >&nbsp</div>
      <div class="number btn btn-outlined btn-positive" v-touch:tap="press(0)">0</div>
      <div class="number btn btn-outlined btn-positive" v-touch:tap="press('.')">.</div>
    </div>
  
    <button class="btn btn-positive btn-block" @click="add">Add Amount</button>

  </div>
</template>

<script>
import Store from '../store.js'

export default {
  data () {
    return {
      store: Store
    }
  },

  ready() {
    //
  },

  methods: {
    clear() {
      this.store.state.amount = ''
    },

    press(number) {
      this.store.state.amount += String(number)
    },

    add() {
      this.$router.go('/select-category')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-size: 4rem;
  }

  .numbers {
    height: 100%;
    overflow: hidden;
    margin: auto;
    padding: 50px;
    padding-top: 0;
    max-width: 400px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }
  
  .numbers .number {
    width: 70px;
    margin: 5px;
    font-size: 3rem;
  }
</style>
