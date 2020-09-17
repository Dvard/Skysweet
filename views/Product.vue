<template>
	<div id="product">
		<main>
			<button class="btn btn-primary" @click="$router.push('/')">Back</button>
			<div class="row" id="inner">
				<div class="col-md-6 col-sm-12">
					<h1 v-text="product.title"></h1>
					<p v-text="product.description"></p>
				</div>
				<div class="col-md-6 col-sm-12">
					<img :src="getImgUrl(product.short)" alt="Iced Tea">
					<h2 v-text="product.price + '€'"></h2>
					<div class="row" id="buttons">
						<div class="col-4">
							<button class="btn btn-light">-</button>
						</div>
						<div class="col-4">
							<div id="qty">0</div>
						</div>
						<div class="col-4">
							<button class="btn btn-light">+</button>
						</div>
					</div>
					<button class="btn btn-info">Add to cart</button>
				</div>
			</div>
		</main>
	</div>
</template>
<script>
export default {
	name: 'Product',
	props: ['id'],
	data: function () {
		return {
			product: {},
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
		fetchProduct: function (id) {
			return {id: id, title: 'Title', description: 'description', price: 2.5, short: 'green_tea'};
		},
	},
	mounted() {
		this.product = this.fetchProduct(this.$props.id)
	},
}
</script>

<style scoped>
#product {
	padding: 20px;
	display: flex;
	align-items: center;
	margin-top: 10vh;
}

main {
	width: 70%;
	background-color: var(--light-border);
	padding: 20px;
	margin-left: auto;
	margin-right: auto;
	max-height: 80vh;
}

#inner {
	text-align: center;
}

h1, p {
	text-align: left;
	padding-left: 5rem;
}

h1 {
	font-size: 4rem;
	color: var(--accent);
}

p {
	font-size: 2rem;
}

img {
	max-width: 20vw;
}

#buttons {
	display: flex;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
	width: fit-content;
	margin-bottom: 20px;
}

#qty {
	font-family: 'Montserrat', sans-serif;
	font-size: 1.2rem;
	color: var(--black);
	padding-left: 10px;
	padding-right: 10px;

}
</style>
