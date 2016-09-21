import _ from 'lodash'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueTouch from 'vue-touch'
import Store from './store.js'
import App from './App'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'
import SelectCategory from './components/SelectCategory'
import AddAmount from './components/AddAmount'
import AddCategories from './components/AddCategories'
import Summary from './components/Summary'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCGBNzQ6YXfvazgQd3r98kPqQoP1GcoSp8",
  authDomain: "spend-mo.firebaseapp.com",
  databaseURL: "https://spend-mo.firebaseio.com",
  storageBucket: "",
};
firebase.initializeApp(config);

/* eslint-disable no-new */

Vue.use(VueRouter);
Vue.use(VueTouch)

var router = new VueRouter()

router.map({
    '/login': {
        component: Login
    },

    '/logout': {
    	name: 'logout',
        component: Logout
    },

    '/register': {
        component: Register
    },

    '/add-categories': {
    	name: 'add-categories',
    	component: AddCategories,
    	auth: true
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

router.redirect({ '/': '/add-amount'})

router.start(App, 'body')
