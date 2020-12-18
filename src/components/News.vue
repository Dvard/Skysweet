<template>
	<div id="news">
		<div class="row" id="inner">
			<div class="col col-sm-7 col-xs-8" id="text">
				<h2>New Flavour!</h2>
				<p>We are happy to announce a new flavour to the family!</p>
				<p><mark>Blueberry</mark>!</p>
				<div class="row">
					<div class="col-md-6 col-sm-12">
						<button class="btn btn-primary" @click="$router.push('/product/5')">Read more</button>
					</div>
				</div>
			</div>
			<div class="col col-xs-4" id="image">
				<img src="../assets/products/blueberry.png" alt="Blueberry Iced Tea">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'News',
}
</script>

<style scoped>
#news {
	margin-top: 10vh;
	height: 70vh;
	background-color: var(--accent-y);
	padding: 5vw;
	display: flex;
	align-items: center;
}

#inner {
	margin-left: auto;
	margin-right: auto;
}

h2 {
	color: var(--accent);
	font-size: 3rem;
	margin: 0;
}

p {
	font-size: 1.5rem;
}

mark {
	padding: 0;
	margin: 0;
	background: none;
	color: var(--white);
	font-weight: bold;
}

#image img {
	max-height: 40vh;
}

@media screen and (max-width: 700px) {
	img {
		display: none;
	}
}
</style>
