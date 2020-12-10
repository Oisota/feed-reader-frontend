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
		addFeed() {
			this.$store.dispatch('subscriptions/add', {
				url: this.feedUrl,
			})
				.then(() => {
					this.loadData();
					this.feedUrl = '';
				});
		},
		remove(index: number) {
			const feed = this.subscriptions[index];
			this.$store.dispatch('subscriptions/delete', {
				index: index,
				id: feed.id,
			});
		}
	}
});
