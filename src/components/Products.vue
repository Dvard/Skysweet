<template>
	<main>
		<h1>Products</h1>
		<div class="row" id="products">
			<div class="product col-md-4 col-sm-6 col-xs-12" v-for="product in products" :key="product.id">
				<div class="product-inner">
					<img :src="getImgUrl(product.short)" alt="Iced Tea">
					<h2 v-text="product.title"></h2>
					<h3 class="sold-out" v-if="product.qty < 1">Sold Out!</h3>
					<p v-text="product.description"></p>
					<h3 v-text="product.price + '€'"></h3>
					<div class="row buttons" v-if="product.qty > 0">
						<div class="col-sm-12">
							<button class="btn btn-info" @click="$router.push('/product/' + product.id)">Read more</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	name: 'Products',
	data: function () {
		return {
			products: [],
			backup_products: [
				{
					id: 1,
					title: 'Sweet Iced Tea',
					short: 'sweet',
					description: 'A sweet iced tea with a natural flavoring.',
					qty: 5000,
					price: 2.5,
				},
				{
					id: 2,
					title: 'Green Tea',
					short: 'green_tea',
					description: 'A classical iced tea with a sweet green tea taste.',
					qty: 200,
					price: 2.3,
				},
				{
					id: 3,
					title: 'Lemon Iced Tea',
					short: 'lemon',
					description: 'Our most popular flavor. All natural flavors.',
					qty: 8000,
					price: 2.2,
				},
				{
					id: 4,
					title: 'Mixed Iced Tea',
					short: 'mix',
					description: 'A pack of 12 mixed flavours.',
					qty: 1000,
					price: 27.5,
				},
			]
		};
	},
	methods: {
		getImgUrl(img_name) {
			try {
				return require('../assets/products/' + img_name + '.png');
			}
			catch {
				return '';
			}
		},
		fetchProducts() {
			this.$axios
					.get(this.$store.state.apiUrl + '/products', {})
					.then((results) => {
						this.products = results.data.products;
					})
					.catch((error) => {
						console.log(error);
						this.products = [];
					})
		},
	},
	mounted: function () {
		this.fetchProducts()
	},
}
</script>

<style scoped>
main {
	min-height: 100vh;
	height: auto;
	padding-left: 5vw;
	padding-right: 5vw;
}

h1 {
	font-size: 3rem;
	padding-top: 15vh;
}

#products {
	background-color: var(--white-hover);
}

.product {
	padding: 20px;
}

.product-inner {
	background-color: var(--white);
	padding: 10px;
	border: 1px solid var(--light-border);
	border-radius: 5px;
	text-align: center;
}

.product h2 {
	text-align: center;
	color: var(--accent);
}

.product img {
	width: 80%;
}

.product h3 {
	text-align: center;
}

.buttons {
	margin-left: auto;
	margin-right: auto;
	width: fit-content;
}

.sold-out {
	color: darkred;
}

@media screen and (max-width: 400px) {
	main {
		padding-left: 2px;
		padding-right: 2px;
	}
}
</style>
