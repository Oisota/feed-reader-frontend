import Vue from 'vue';
import ky from 'ky';
import {Options} from 'ky';

interface CustomKyOptions extends Options {
	handleError: boolean;
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
		afterResponse: [showNotifications]
	},
};

const http = ky.extend(opts);

export default http;
