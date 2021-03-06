import Vue from 'vue'
import Router from 'vue-router'
import Ping from '@/components/Ping' //@ 等价于 /src 这个目录，避免写麻烦又易错的相对路径
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import EditProfile from '@/components/EditProfile'
import Post from '@/components/Post'
import store from '../store'
Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/user/:id', //动态路径参数,以冒号开头
			name: 'Profile',
			component: Profile,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/edit-profile',
			name: 'EditProfile',
			component: EditProfile,
			meta: {
				requiresAuth: true
			}
		}, 
		{
			path: '/post/:id',
			name: 'Post',
			component: Post
		},
		{
			path: '/ping',
			name: 'Ping',
			component: Ping
		}
	]
})

router.beforeEach((to, from, next) => {
	const token = window.localStorage.getItem('blog-token')
	if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
		next({
			path: '/login',
			query: { redirect: to.fullPath }
		})
	} else if (token && to.name == 'Login') {
		// 用户已登录，但又去访问登录页面时不让他过去
		next({
			path: from.fullPath
		})
	} else if (token && to.name == 'Register') {
		next({
			path: from.fullPath
		})
	} else {
		next()
	}
})
export default router
