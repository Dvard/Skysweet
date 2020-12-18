<template>
	<div>
		<nav>
			<div class="row" id="inner">
				<div class="col-xs-2">
					<a @click="$router.push('/')" class="nav-item nav-link">Home</a>
				</div>
				<div class="col-xs-2">
					<a href="/#products" class="nav-item nav-link">Products</a>
				</div>
				<div class="col-xs-4">
					<img class="nav-item" id="logo" src="../assets/banner.png" alt="Skysweet">
				</div>
				<div class="col-xs-2">
					<a href="/about" class="nav-item nav-link">About</a>
				</div>
				<div class="col-xs-2">
					<a v-if="!$store.state.isLoggedIn" class="nav-item nav-link nav-link-marked" @click="$router.push('/user')">Login/Signup</a>
					<a v-else @click="$router.push('/cart')" class="nav-item nav-link nav-link-marked">Cart</a>
				</div>
			</div>
		</nav>

		<div id="mobile">
			<div class="row">
				<div class="col-xs-3">
					<a class="nav-item nav-link" @click="$router.push('/')">Home</a>
				</div>
				<div class="col-xs-3">
					<a class="nav-item nav-link" href="/#products">Products</a>
				</div>
				<div class="col-xs-3">
					<a class="nav-item nav-link" @click="$router.push('/about')">About</a>
				</div>
				<div class="col-xs-3">
					<a v-if="!$store.state.isLoggedIn" class="nav-item nav-link nav-link-marked" @click="$router.push('/user')">Login</a>
					<a v-else @click="$router.push('/cart')" class="nav-item nav-link nav-link-marked">Cart</a>
				</div>
			</div>
		</div>
	</div>
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

.nav-link-marked {
	color: var(--accent-o);
}

#logo {
	max-height: 6vh;
	margin-left: auto;
	margin-right: auto;
}

button * {
	width: fit-content;
	height: fit-content;
	padding: 2px;
	color: var(--white);
}

#mobile {
	padding-top: 15px;
	padding-bottom: 15px;
	width: 100%;
	height: fit-content;
	border-bottom: 2px solid var(--light-border);
	background-color: var(--white);
	text-align: center;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	visibility: hidden;
}

@media screen and (max-width: 870px) {
	nav {
		visibility: hidden;
	}

	#mobile {
		visibility: visible;
	}
}
</style>
