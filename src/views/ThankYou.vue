<template>
	<main>
		<h1>Thank You! We Have Received Your Order!</h1>
		<h2 v-text="'Order id: #' + orderId"></h2>
		<p>We will send you an e-mail once your parcel has been shipped.</p>
		<button class="btn btn-primary" @click="$router.push('/')">Continue Shopping</button>
	</main>
</template>

<script>
export default {
	name: 'ThankYou',
	props: ['orderId']
}
</script>

<style scoped>
main {
	padding: 25px;
	text-align: center;
}

h1 {
	font-size: 4rem;
	color: var(--accent);
	margin-left: auto;
	margin-right: auto;
	width: 80%;
}
</style>
