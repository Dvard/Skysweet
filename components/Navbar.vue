<template>
	<nav>
		<div class="row" id="inner">
			<div class="col-2">
				<a @click="$router.push('/')" class="nav-item nav-link">Home</a>
			</div>
			<div class="col-2">
				<a href="/about" class="nav-item nav-link">About</a>
			</div>
			<div class="col-4">
				<img class="nav-item" id="logo" src="../assets/banner.png" alt="Skysweet">
			</div>
			<div class="col-2">
				<a href="#products" class="nav-item nav-link">Products</a>
			</div>
			<div class="col-2">
				<a href="/cart" class="nav-item nav-link">Cart</a>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'Navbar',
}
</script>

<style scoped>
nav {
	width: 100%;
	height: 10vh;
	border-bottom: 2px solid var(--light-border);
	background-color: var(--white);
	text-align: center;
	position: fixed;
	top: 0;
	left: 0;
}

#inner {
	height: 100%;
	width: fit-content;
	margin-left: auto;
	margin-right: auto;
	padding-top: 3vh;
	padding-bottom: 3vh;
}

.nav-item {
	height: 100%;
	display: flex;
	align-items: center;
}

.nav-link {
	font-size: 1.3rem;
	padding-left: 5vw;
	padding-right: 5vw;
	text-decoration: none;
}

.nav-item:hover {
	cursor: pointer;
}

.nav-link:hover {
	color: var(--accent);
}

#logo {
	max-height: 6vh;
}
</style>
