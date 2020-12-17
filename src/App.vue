<template>
	<div id="app" class="container-fluid">
		<Navbar></Navbar>
		<router-view/>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
	components: {Navbar},
	mounted() {
		const authToken = localStorage.getItem('authToken')
		console.log(authToken)

		if (authToken) {
			this.$axios.get(this.$store.state.apiUrl + '/test', {
				params: {
					token: authToken
				}
			// eslint-disable-next-line no-unused-vars
			}).then(_ => {
				this.$store.commit('setToLoggedIn', authToken)
			}).catch(err => {
				console.log(err)
			});
		}
	}
}
</script>

<style>
:root {
	--light-border: #eee;
	--white: #fff;
	--white-hover: #f9f9f9;
	--black: #0D0C07;
	--dark: #777;
	--accent: #17BEBB;
	--accent-y: #FFC914;
	--accent-o: #E4572E;
}

@font-face {
	font-family: 'Permanent Marker';
	src: url("assets/Permanent_Marker/PermanentMarker-Regular.ttf");
}

@font-face {
	font-family: 'Montserrat';
	src: url("assets/Montserrat/Montserrat-Regular.ttf");
}

h1, h2, h3, h4, h5, h6 {
	font-family: 'Permanent Marker', 'Montserrat', sans-serif;
}

p, a, li, .btn {
	font-family: 'Montserrat', sans-serif;
	color: var(--black);
}

html {
	scroll-behavior: smooth;
}

.btn {
	padding-left: 3vw;
	padding-right: 3vw;
	border: none;
	width: fit-content;
	padding-top: 1vh;
	padding-bottom: 1vh;
	border-radius: 5px;
	color: var(--white);
	outline: none;
	font-size: 1.3rem;
}

.btn:hover {
	cursor: pointer;
	color: var(--light-border);
}

.btn-primary:hover {
	color: var(--light-border) !important;
}

.btn-light {
	background-color: var(--light-border);
	border: 1px solid var(--white);
	color: var(--dark);
	font-size: 2rem;
	padding-left: 14px !important;
	padding-right: 14px !important;
}

.btn-light:hover {
	color: var(--accent);
}

.btn-primary {
	background-color: var(--accent);
}

.btn-info {
	background-color: var(--accent-o);
}
</style>
