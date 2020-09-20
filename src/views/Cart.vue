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
					<p v-text="product.qty"></p>
				</div>
				<div class="col-xs-2">
					<p class="bold" v-text="product.qty * product.price"></p>
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
			cartData: [],
		};
	},
	computed: {
		subtotal() {
			return 0;
		},
	},
	methods: {
		getCartItemIds(cartStr) {
			const ids = cartStr.split(',');
			ids.pop()

			return ids;
		},
		fetchProductById(product_id) {
			return this.$axios.get(this.$store.state.apiUrl + '/product/' + product_id, {})
		},
		fetchCartItemById(cart_item_id) {
			return this.$axios
					.get(this.$store.state.apiUrl + '/cart_item/' + cart_item_id, {
						params: {
							token: this.$store.state.authToken
						}
					})
		},
		parseCartItemIds(cart_item_ids) {
			let cart_items = [];

			cart_item_ids.forEach(cart_item_id => {
				this.fetchCartItemById(cart_item_id).then(cart_item_results => {

					this.fetchProductById(cart_item_results.data.product).then(product_results => {

						cart_items.push({
							title: product_results.data.title,
							price: product_results.data.price,
							qty: cart_item_results.data.qty,
						})
					});
				});
			})

			return cart_items;
		},
		fetchCartItems() {
			return this.$axios.get(this.$store.state.apiUrl + '/user', {
				params: {
					token: this.$store.state.authToken
				}
			})
		},
	},
	mounted() {
		this.fetchCartItems().then((results) => {
			const cart_item_ids = this.getCartItemIds(results.data.cart);
			if (cart_item_ids) {
				this.cartData = this.parseCartItemIds(cart_item_ids);
			}

			return [];
		})
	}
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
