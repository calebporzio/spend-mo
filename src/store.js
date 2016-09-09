
export default {
	state: {
		amount: '',
		category: null
	},

	addTransaction(callback) {
		let userId = firebase.auth().currentUser.uid;
		var newTransactionKey = firebase.database().ref().child('transactions').push().key;

		let transactionData = {
		  amount: Number(this.state.amount).toFixed(2),
		  category: this.state.category
		}

		let updates = {}

		updates['transactions/' + userId + '/' + (new Date).getMonth() + '/' + newTransactionKey] = transactionData

		this.state.amount = '';
		this.state.category = null;

		return firebase.database().ref().update(updates)
	}
}