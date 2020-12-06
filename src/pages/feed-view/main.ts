import Vue from 'vue';

export default Vue.extend({
	name: 'feed-view',
	created() {
		this.loadFeed();
	},
	computed: {
		feed() {
			return this.$store.state.feed.feed;
		},
	},
	methods: {
		loadFeed() {
			this.$store.dispatch('feed/load');
		},
		next() {
			console.log('Next');
		},
		prev() {
			console.log('Prev');
		}
	}
});
