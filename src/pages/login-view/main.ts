import Vue from 'vue';

import Card from 'App/components/card';

export default Vue.extend({
	name: 'login-view',
	components: {
		'x-card': Card,
	},
	data() {
		return {
			email: '',
			password: '',
			registerEmail: '',
			registerPassword: '',
		};
	},
	methods: {
		async login() {
			try {
				await this.$store.dispatch('user/login', {
					email: this.email,
					password: this.password,
				});
			} catch (err) {
				console.log(err);
			}
			this.$router.push({name: 'home'});
		},
		async register() {
			try {
				await this.$store.dispatch('user/register', {
					email: this.registerEmail,
					password: this.registerPassword,
				});
			} catch (_) {
				this.$notify({
					title: 'Error',
					text: 'Account not created',
					type: 'alert-danger'
				});
			}
			this.$notify({
				title: 'Account Created',
				text: 'An email will be sent once you are verified',
				type: 'alert-success'
			});
		},
	},
});
