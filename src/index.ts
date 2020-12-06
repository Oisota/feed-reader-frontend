import Vue from 'vue';

import App from './components/app';
import store from './store';
import router from './router';
import config from './config';


(async () => {

	//await store.dispatch('user/load');

	const app = new Vue({
		el: '#app',
		router: router,
		store: store,
		render: h => h(App)
	});

	if (config.ENV !== 'production') {
		(window as any).app = app;
	}

})();
