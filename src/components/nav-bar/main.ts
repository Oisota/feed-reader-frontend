import Vue from 'vue';

import { Role } from 'App/util';

export default Vue.extend({
	name: 'nav-bar',
	computed: {
		loggedIn() {
			return this.$store.getters['user/loggedIn'];
		}
	},
	methods: {
		async logout() {
			await this.$store.dispatch('user/logout');
			this.$router.push({name: 'login'});
		},
		hasRole(role: string) {
			return this.$store.state.user.user.role <= Role[role.toUpperCase()];
		},
	}
});
