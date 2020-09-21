<template>
	<main>
		<div id="login-signup">
			<h1>Login</h1>
			<form id="login" @submit.prevent="login()">
				<input type="email" placeholder="Email..." v-model="formData.email">
				<input type="password" placeholder="Password..." v-model="formData.password">
				<input type="submit" value="Login" class="btn btn-primary">
			</form>
			<h2>- - - or - - -</h2>
			<h1>Signup</h1>
			<form id="signup" @submit.prevent="signup()">
				<input type="email" placeholder="Email..." v-model="formData.email">
				<input type="password" placeholder="Password..." v-model="formData.password">
				<input type="password" placeholder="Retype Password..." v-model="formData.retypePassword">
				<input type="submit" value="Signup" class="btn btn-info">
			</form>
		</div>
	</main>
</template>

<script>
export default {
	name: 'User',
	data: function () {
		return {
			formData: {
				email: '',
				password: '',
				retypePassword: '',
			},
		};
	},
	methods: {
		login() {
			if (this.formData.email && this.formData.password) {
				this.$store.commit('login', {email: this.formData.email, password: this.formData.password});
			}

			if (this.$store.state.isLoggedIn) {
				this.$router.push('/');
			}

		},
		signup() {
			if (this.formData.email && this.formData.password && this.formData.retypePassword) {
				if (this.formData.password === this.formData.retypePassword) {
					this.$store.commit('signup', {email: this.formData.email, password: this.formData.password});
				}
			}

			if (this.$store.state.isLoggedIn) {
				this.$router.push('/');
			}

		},
	},
}
</script>

<style scoped>
main {
	margin-top: 15vh;
	display: flex;
	align-items: center;
}

#login-signup {
	margin-left: auto;
	margin-right: auto;
	width: 30vw;
	padding: 30px;
	background-color: var(--light-border);
	border-radius: 5px;
	text-align: center;
}

#login-signup h1 {
	color: var(--accent);
}

#login-signup h2 {
	color: var(--black);
	opacity: .2;
}

#login-signup input {
	width: 90%;
	padding: 10px;
	border: none;
	outline: 1px solid var(--white);
	margin-bottom: 10px;
	margin-top: 10px;
}
</style>
