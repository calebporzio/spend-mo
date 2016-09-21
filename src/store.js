
export default {
	ready: false,

	authenticated: false,

	state: {
		categories: null,
		userCategories: null,
		transactions: null,
		amount: '',
		category: null
	},

	init(callback) {
		this.ready = false;
		Promise.all([
			this.fetchUserCategories(),
			this.fetchCategories(),
			this.fetchTransactions()
		]).then(() => {
			this.ready = true
			callback()
		})
	},

	addTransaction(callback) {
		let userId = firebase.auth().currentUser.uid;
		var newTransactionKey = firebase.database().ref().child('transactions').push().key;

		let transactionData = {
		  amount: Number(this.state.amount).toFixed(2),
		  time: Date.now(),
		  category: this.state.category
		}

		let updates = {}

		updates['transactions/' + userId + '/' + (new Date).getMonth()+'-'+(new Date).getFullYear() + '/' + newTransactionKey] = transactionData

		this.state.amount = '';
		this.state.category = null;

		return firebase.database().ref().update(updates)
	},

	removeTransaction(transactionKey) {
		let userId = firebase.auth().currentUser.uid;
		let transactionsRef = firebase.database().ref('transactions/' + userId +  '/' + (new Date).getMonth()+'-'+(new Date).getFullYear() + '/' + transactionKey)
		transactionsRef.remove();
	},

	setCategories(categories) {
		let userId = firebase.auth().currentUser.uid;

		return firebase.database().ref('/userCategories/'+userId).set(categories);
	},

	fetchCategories() {
		let userId = firebase.auth().currentUser.uid;
		let categoryRef = firebase.database().ref('/categories')
		return new Promise((resolve, reject) => {
			categoryRef.on('value', snapshot => {
			  this.state.categories = snapshot.val()
			  resolve()
			})
		})
	},

	fetchUserCategories() {
		let userId = firebase.auth().currentUser.uid;
		let categoryRef = firebase.database().ref('/userCategories/'+userId)
		return new Promise((resolve, reject) => {
			categoryRef.on('value', snapshot => {
			  this.state.userCategories = snapshot.val()
			  resolve()
			})
		})
	},

	fetchTransactions() {
		let userId = firebase.auth().currentUser.uid;
		let categoryRef = firebase.database().ref('/transactions/'+userId+'/'+(new Date).getMonth()+'-'+(new Date).getFullYear())
		return new Promise((resolve, reject) => {
			categoryRef.on('value', snapshot => {
			  this.state.transactions = snapshot.val()
			  resolve()
			})
		})
	}
}