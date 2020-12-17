import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from "@/views/Product";
import Cart from "@/views/Cart";
import User from "@/views/User";
import ThankYou from "@/views/ThankYou";
import About from "@/views/About";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		component: About
	},
	{
		path: '/product/:id',
		name: 'Product',
		component: Product,
		props: true,
	},
	{
		path: '/user/:product_id?',
		name: 'User',
		component: User,
	},
	{
		path: '/cart',
		name: 'Cart',
		component: Cart,
	},
	{
		path: '/thank-you/:orderId?',
		name: 'ThankYou',
		component: ThankYou,
		props: true,
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
