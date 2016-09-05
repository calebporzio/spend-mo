import _ from 'lodash'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'
import SelectCategory from './components/SelectCategory'
import AddAmount from './components/AddAmount'

/* eslint-disable no-new */

Vue.use(VueRouter);

var router = new VueRouter()

router.map({
    '/login': {
        component: Login
    },

    '/logout': {
        component: Logout
    },

    '/register': {
        component: Register
    },
    
    '/select-category': {
    	component: SelectCategory,
    	auth: true
    },

    '/add-amount/:category': {
    	name: 'add-amount',
    	component: AddAmount,
    	auth: true
    }
})

router.beforeEach(transition => {
  if (transition.to.auth && !firebase.auth().currentUser) {
    transition.redirect('/login')
  } else {
    transition.next()
  }
})

firebase.auth().onAuthStateChanged(user => {
  if (user) {
  	user = user;
    router.go('/select-category')
  } else {
  	user = null
    router.go('/login')
  }
  if (! router.app) {
  	router.start(App, '#app')
  }
});
