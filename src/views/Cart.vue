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
					<p v-text="product.price + '€'">Price</p>
				</div>
				<div class="col-xs-2">
					<div class="row">
						<div class="col-4">
							<button class="btn btn-light" @click="updateQty(product.cartItemId, product.qty - 1)">-</button>
						</div>
						<div class="col-4">
							<p class="btns-around" v-text="product.qty"></p>
						</div>
						<div class="col-4">
							<button class="btn btn-light" @click="updateQty(product.cartItemId, product.qty + 1)">+</button>
						</div>
					</div>
				</div>
				<div class="col-xs-2">
					<div class="row">
						<div class="col-6">
							<p class="bold btns-around" v-text="(product.qty * product.price) + '€'"></p>
						</div>
						<div class="col-6">
							<button class="btn btn-light" @click="deleteCartItem(product.cartItemId)">x</button>
						</div>
					</div>
				</div>
			</div>
			<div id="subtotal-area">
				<h3>Subtotal:</h3>
				<p v-text="subtotal + '€'" id="subtotal"></p>
			</div>
			<div id="btn-area">
				<button class="btn btn-primary" @click="showCheckout = !showCheckout">Checkout</button>
			</div>

			<div id="checkout" v-show="showCheckout">
				<h2>Checkout</h2>
				<form @submit.prevent="placeAndVerifyOrder()">
					<h4>Contact Information</h4>
					<input type="name" name="firstName" v-model="checkoutFormData.firstName" placeholder="First Name" required>
					<br/>
					<input type="name" name="lastName" v-model="checkoutFormData.lastName" placeholder="Last Name" required>
					<br/>
					<input type="phone" name="phone" v-model="checkoutFormData.phone" placeholder="Phone number" required>

					<h4>Shipping Information</h4>
					<input type="name" name="address" v-model="checkoutFormData.address" placeholder="Address" required>
					<br/>
					<input type="number" name="zip" v-model="checkoutFormData.zip" placeholder="Postal Code" required>
					<br/>
					<input type="name" name="city" v-model="checkoutFormData.city" placeholder="City" required>
					<br/>
					<input type="name" name="country" v-model="checkoutFormData.country" placeholder="Country" required>

					<h4>Do you have a coupon code?</h4>
					<input type="text" placeholder="Coupon code">

					<h4>Payment method</h4>
					<button disabled>PayPal (default)</button>

					<br/>

					<input type="submit" class="btn btn-primary" :value="'Pay now: ' + subtotal + '€'">
				</form>
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
			showCheckout: false,
			checkoutFormData: {
				firstName: '',
				lastName: '',
				phone: '',
				address: '',
				zip: '',
				city: '',
				country: '',
			}
		};
	},
	computed: {
		subtotal() {
			let subtotal = 0;

			this.cartData.forEach(cartItem => {
				subtotal += cartItem.price * cartItem.qty;
			})

			return subtotal;
		},
	},
	methods: {
		getCartItemIds(cartStr) {
			const ids = cartStr.split(',');
			ids.pop();

			return ids;
		},
		fetchProductById(productId) {
			return this.$axios.get(this.$store.state.apiUrl + '/product/' + productId, {});
		},
		fetchCartItemById(cartItemId) {
			return this.$axios
					.get(this.$store.state.apiUrl + '/cart_item/' + cartItemId, {
						params: {
							token: this.$store.state.authToken
						}
					});
		},
		parseCartItemIds(cartItemIds) {
			let cartItems = [];

			cartItemIds.forEach(cartItemId => {
				this.fetchCartItemById(cartItemId).then(cartItemResults => {
					if (cartItemResults.data !== '404') {
						this.fetchProductById(cartItemResults.data.product).then(productResults => {

							cartItems.push({
								title: productResults.data.title,
								price: productResults.data.price,
								qty: cartItemResults.data.qty,
								cartItemId: cartItemResults.data.id,
							});
						});
					}
				});
			});

			return cartItems;
		},
		fetchCartItems() {
			return this.$axios.get(this.$store.state.apiUrl + '/user', {
				params: {
					token: this.$store.state.authToken
				}
			});
		},
		updateQty(cartItemId, qty) {
			this.$axios
					.put(this.$store.state.apiUrl+ '/cart_item/' + cartItemId, {
						qty: qty,
					}, {
						params: {
							token: this.$store.state.authToken,
						},
					},)
					.then(() => {
						this.fetch();
					})
					.catch((error) => {
						console.log(error);
						this.fetch();
					})
		},
		deleteCartItem(cartItemId) {
			this.$axios
					.delete(this.$store.state.apiUrl+ '/cart_item/' + cartItemId, {
						params: {
							token: this.$store.state.authToken,
						},
					},)
					.then(() => {
						this.fetch();
					})
					.catch((error) => {
						console.log(error);
						this.fetch();
					})
		},
		fetch() {
			if (this.$store.state.isLoggedIn) {
				this.fetchCartItems().then((results) => {
					const cartItemIds = this.getCartItemIds(results.data.cart);
					if (cartItemIds) {
						this.cartData = this.parseCartItemIds(cartItemIds);
					}

					return [];
				});
			}
		},
		placeAndVerifyOrder() {
			console.log(this.cartData)

			const d = new Date()
			const date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()

			const address = [
				this.checkoutFormData.firstName,
				this.checkoutFormData.lastName,
				this.checkoutFormData.phone,
				this.checkoutFormData.address,
				this.checkoutFormData.zip,
				this.checkoutFormData.city,
				this.checkoutFormData.country,
			]

			this.$axios.post(this.$store.state.apiUrl + '/checkout', {
				order: this.cartData,
				date,
				payment_method: 'paypal',
				address: address.join(','),
			},{
				params: {
					token: this.$store.state.authToken,
				},
			}).then(res => {
				this.$router.push('/thank-you/' + res.data)
			}).catch(err => {
				console.log(err)
			})
		},
	},
	mounted() {
		this.fetch();
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
	border-bottom: 1px solid var(--dark);
	color: var(--accent-o);
}

#btn-area {
	text-align: right;
	padding-top: 20px;
	width: 80%;
	margin-left: auto;
	margin-right: auto;
}

.table-row .btn-light {
	font-size: 1rem;
	padding-top: .5vh;
	padding-bottom: .5vh;
	padding-left: 1vw;
	padding-right: 1vw;
}

.table-row-items div {
	display: flex;
	align-items: center;
}

.btns-around {
	padding-left: 1vw;
	padding-right: 1vw;
}

#checkout {
	width: 40%;
	text-align: center;
	margin-left: auto;
	margin-right: auto;
}

#checkout h2 {
	font-size: 2rem;
}

#checkout form input, #checkout .btn {
	margin-top: 5px;
	margin-bottom: 5px;
}

#checkout form input {
	width: 100%;
	padding: 10px;
	border: none;
	outline: 1px solid var(--white);
	margin-bottom: 10px;
	margin-top: 10px;
}

#checkout h4 {
	text-align: left;
	color: var(--accent-o);
}
</style>
