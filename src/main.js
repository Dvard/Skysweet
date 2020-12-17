import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Axios
import axios from 'axios';
Vue.prototype.$axios = axios;

// Flexbox Grid
import './assets/flexboxgrid.min.css';

// Vuex
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		apiUrl: 'https://dhg19.pythonanywhere.com',
		authToken: '',
		isLoggedIn: false,
	},
	mutations: {
		login(state, {email, password, product_id}) {
			axios
				.post(state.apiUrl + '/user/login', {
					email: email,
					password: password
				})
				.then((results) => {
					state.authToken = results.data.token;
					state.isLoggedIn = true;
					localStorage.setItem('authToken', state.authToken)

					if (product_id) {
						router.push('/product/' + this.product_id);
					} else {
						router.push('/');
					}
				})
				.catch((error) => {
					console.log(error);
					state.authToken = '';
					localStorage.setItem('authToken', '')
					state.isLoggedIn = false;
				})
		},
		signup(state, {email, password, product_id}) {
			axios
				.post(state.apiUrl + '/user/signup', {
					email: email,
					password: password,
				})
				.then((results) => {
					state.authToken = results.data.token;
					state.isLoggedIn = true;

					localStorage.setItem('authToken', state.authToken)

					if (product_id) {
						router.push('/product/' + this.product_id);
					} else {
						router.push('/');
					}
				})
				.catch((error) => {
					console.log(error);
					state.authToken = '';
					localStorage.setItem('authToken', '')

					state.isLoggedIn = false;
				})
		},
		setToLoggedIn(state, authToken) {
			state.authToken = authToken;
			state.isLoggedIn = true;
			console.log('is logged in')
		},
		logout(state) {
			state.authToken = '';
			state.isLoggedIn = false;
			window.location = '/'
		},
	}
})

// Vue Toast
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
