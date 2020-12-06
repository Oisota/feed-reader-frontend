import Vue from 'vue';
import VueRouter from 'vue-router';

//import store from './store';
import pages from './pages';
import { Role } from 'App/util';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: pages.MainView,
			meta: {
				title: 'Posts',
				role: Role.USER,
			}
		},
		{
			path: '/login',
			name: 'login',
			component: pages.LoginView,
			meta: {
				title: 'Login',
				role: Role.ANY,
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: pages.NotFoundView,
			meta: {
				title: 'Not Found',
				role: Role.ANY,
			}
		}
	]
});

router.beforeEach((to, from_, next) => {
	document.title = `Feed Reader | ${to.meta.title}`;
	/*
	const loggedIn = store.getters['user/loggedIn'];
	const hasRole = store.state.user.user.role <= to.meta.role;
	if (!loggedIn && to.name !== 'login' && !hasRole) {
		next({name: 'login'});
	} else {
		next();
	}
	*/
});

export default router;
