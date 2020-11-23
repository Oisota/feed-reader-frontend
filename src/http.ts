import Vue from 'vue';
import ky from 'ky';
import {Options} from 'ky';

import store from './store';

interface CustomKyOptions extends Options {
	handleError: boolean;
}

function addAuth(req: Request) {
	const token = store.state.user.user.token;
	if (token !== null || typeof token !== 'undefined') {
		req.headers.set('Authorization', `Bearer ${token}`);
	}
}

async function showNotifications(_: Request, opts: any, res: Response) {
	// show notification
	if (res.status >= 400) {
		const handleError = opts.hasOwnProperty('handleError') && opts.handleError;
		if (handleError) {
			const data = await res.json();
			try {
				Vue.notify({
					title: 'Error',
					text: data.error.message,
					type: 'alert-danger',
				});
			} catch (err) {
				console.log(err);
			}
		}
	}
	return res;
}


const opts: CustomKyOptions = {
	prefixUrl: `${window.location.origin}/api/v1`,
	handleError: true,
	hooks: {
		beforeRequest: [addAuth],
		afterResponse: [showNotifications]
	},
};

const http = ky.extend(opts);

export default http;
