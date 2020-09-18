<template>
	<main class="row">
		<div class="col-xs-12">
			<News></News>
			<Products id="products"></Products>
		</div>
	</main>
</template>

<script>
import News from "@/components/News";
import Products from "@/components/Products";

export default {
	name: 'Home',
	components: {Products, News},
}
</script>

<style scoped>
</style>
