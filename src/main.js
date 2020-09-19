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
		apiUrl: 'http://127.0.0.1:5000',
		authToken: '',
		isLoggedIn: false,
	},
	mutations: {
		login(state, {email, password}) {
			axios
				.post(state.apiUrl + '/user/login', {
					email: email,
					password: password
				})
				.then((results) => {
					state.authToken = results.data.token;
					state.isLoggedIn = true;
				})
				.catch((error) => {
					console.log(error);
					state.authToken = '';
					state.isLoggedIn = false;
				})
		},
		signup(state, {email, password}) {
			axios
				.post(state.apiUrl + '/user/signup', {
					email: email,
					password: password,
				})
				.then((results) => {
					state.authToken = results.data.token;
					state.isLoggedIn = true;
				})
				.catch((error) => {
					console.log(error);
					state.authToken = '';
					state.isLoggedIn = false;
				})
		},
	}
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
