import Vue from 'vue';

import Card from 'App/components/card';

export default Vue.extend({
	name: 'register-view',
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
		async register() {
			try {
				await this.$store.dispatch('user/register', {
					email: this.email,
					password: this.password,
				});
			} catch (err) {
				console.log(err);
			}
			this.$router.push({name: 'login'});
		},
	},
});
