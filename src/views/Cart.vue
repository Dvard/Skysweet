<template>
	<main>
		<h1>Shopping Cart</h1>
		<div id="inner">
			<div class="row table-row">
				<div class="col-xs-6">
					<p>Product</p>
				</div>
				<div class="col-xs-2">
					<p>Price</p>
				</div>
				<div class="col-xs-2">
					<p>QTY</p>
				</div>
				<div class="col-xs-2">
					<p>Total</p>
				</div>
			</div>
			<div class="row table-row table-row-items" v-for="(product, index) in cartData" :key="index">
				<div class="col-xs-6">
					<p v-text="product.title"></p>
				</div>
				<div class="col-xs-2">
					<p v-text="product.price">Price</p>
				</div>
				<div class="col-xs-2">
					<p v-text="cartQtys[index]"></p>
				</div>
				<div class="col-xs-2">
					<p class="bold" v-text="cartQtys[index] * product.price"></p>
				</div>
			</div>
			<div id="subtotal-area">
				<h3>Subtotal:</h3>
				<p v-text="subtotal + '€'" id="subtotal"></p>
			</div>
			<div id="btn-area">
				<button class="btn btn-primary">Checkout</button>
			</div>
		</div>
	</main>
</template>
<script>
export default {
	name: 'Cart',
	data: function () {
		return {
			userData: {},
			userCartRaw: '',
			cartData: [],
			cartQtys: [],
		};
	},
	methods: {
		fetchUserData() {
			if (this.$store.state.isLoggedIn) {
				this.$axios
					.get(this.$store.state.apiUrl + '/user', {
						params: {
							token: this.$store.state.authToken
						}
					})
					.then((results) => {
						this.userData = results.data;
						this.parseCartData(this.userData)
					})
					.catch((error) => {
						console.log(error);
						this.userData = {};
					})
			}
		},
		getProduct(id) {
			this.$axios
					.get(this.$store.state.apiUrl + '/product/' + id, {})
					.then((results) => {
						this.cartData.push(results.data)
					})
					.catch((error) => {
						console.log(error);
						this.cartData.push({})
					})
		},
		parseCartData(cartStr) {
			if (cartStr) {
				const product_ids = cartStr.cart.split(',');
				this.cartQtys = cartStr.cart_qtys.split(',');

				for (let i = 0; i < product_ids.length; i++) {
					const id = product_ids[i]
					if (id !== '') {
						this.getProduct(id)
					}
				}
			}
		},
	},
	mounted: async function() {
		this.fetchUserData();
		this.parseCartData();
	},
	computed: {
		subtotal() {
			let subtotal = 0;

			for (let i = 0; i < this.cartData.length; i++) {
				const tmpProduct = this.cartData[i];

				subtotal += tmpProduct.price * this.cartQtys[i];
			}

			return subtotal
		},
	},
}
</script>

<style scoped>
main {
	margin-top: 15vh;
}

h1 {
	font-size: 4rem;
	color: var(--accent);
	margin-left: auto;
	margin-right: auto;
	width: 80%;
}

#inner {
	margin-left: auto;
	margin-right: auto;
	background-color: var(--light-border);
	border-radius: 5px;
	padding: 20px;
	max-width: 80%;
}

#table-header {
	border-bottom: 2px solid var(--black);
}

.table-row-items p {
	opacity: 0.6;
	font-style: italic;
}

.bold {
	color: var(--accent);
}

#subtotal-area {
	text-align: right;
	margin-left: auto;
	margin-right: auto;
	width: 80%;
	padding-top: 10px;
}

#subtotal-area h3, #subtotal-area p {
	padding-top: 0;
	padding-bottom: 5px;
	margin: 0;
}

#subtotal {
	font-size: 2rem;
	border-bottom: 1px solid var(--black);
	color: var(--accent-o);
}

#btn-area {
	text-align: right;
	padding-top: 20px;
	width: 80%;
	margin-left: auto;
	margin-right: auto;
}
</style>
