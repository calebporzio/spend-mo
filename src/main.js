import _ from 'lodash'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueTouch from 'vue-touch'
import App from './App'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'
import SelectCategory from './components/SelectCategory'
import AddAmount from './components/AddAmount'
import Summary from './components/Summary'

/* eslint-disable no-new */

Vue.use(VueRouter);
Vue.use(VueTouch)

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
    	name: 'select-category',
    	component: SelectCategory,
    	auth: true
    },

    '/summary': {
    	name: 'summary',
    	component: Summary,
    	auth: true
    },

    '/add-amount': {
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
    router.go('/add-amount')
  } else {
  	user = null
    router.go('/login')
  }
  if (! router.app) {
  	router.start(App, 'body')
  }
});
