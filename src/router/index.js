import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from "@/views/Product";
import Cart from "@/views/Cart";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/product/:id',
		name: 'Product',
		component: Product,
		props: true,
	},
	{
		path: '/user',
		name: 'UserAndCart',
		component: Cart,
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
