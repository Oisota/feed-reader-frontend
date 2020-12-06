import Vue from 'vue';

export default Vue.extend({
	name: 'subscription-view',
	data() {
		return {
			feedUrl: '',
		}
	},
	created() {
		this.loadData();
	},
	computed: {
		subscriptions() {
			return this.$store.state.subscriptions.subscriptions;
		}
	},
	methods: {
		loadData() {
			this.$store.dispatch('subscriptions/load');
		},
		saveFeed() {
			console.log('Saving');
		},
		remove(id: number) {
			console.log(`remove ${id}`)
		}
	}
});
