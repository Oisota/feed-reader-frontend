import Vue from 'vue';

export default Vue.extend({
	name: 'login-view',
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
				await this.$store.dispatch('user/load');
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
