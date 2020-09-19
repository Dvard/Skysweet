<template>
	<main>
		<div id="login-signup">
			<form id="login" @submit.prevent="login()">
				<input type="email" placeholder="Email..." v-model="formData.email">
				<input type="password" placeholder="Password..." v-model="formData.password">
				<input type="submit" value="Login">
			</form>
			<form id="signup" @submit.prevent="signup()">
				<input type="email" placeholder="Email..." v-model="formData.email">
				<input type="password" placeholder="Password..." v-model="formData.password">
				<input type="password" placeholder="Retype Password..." v-model="formData.retype_password">
				<input type="submit" value="Signup">
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
				retype_password: '',
			}
		};
	},
	methods: {
		login() {
			if (this.formData.email && this.formData.password) {
				this.$store.commit('login', {email: this.formData.email, password: this.formData.password})
			}
		},
		signup() {
			if (this.formData.email && this.formData.password && this.formData.retype_password) {
				if (this.formData.password === this.formData.retype_password) {
					this.$store.commit('signup', {email: this.formData.email, password: this.formData.password})
				}
			}
		},
	},
}
</script>

<style scoped>
main {
	margin-top: 15vh;
}
</style>
