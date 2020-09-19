import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from "@/views/Product";
import Cart from "@/views/Cart";
import User from "@/views/User";

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
		name: 'User',
		component: User,
	},
	{
		path: '/cart',
		name: 'Cart',
		component: Cart,
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
