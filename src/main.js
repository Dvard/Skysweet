import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Axios
import axios from 'axios';
Vue.prototype.$apiUrl = 'http://127.0.0.1:5000'
Vue.prototype.$axios = axios;

// Login Management
Vue.prototype.$user_token = '';

import './assets/flexboxgrid.min.css';

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
