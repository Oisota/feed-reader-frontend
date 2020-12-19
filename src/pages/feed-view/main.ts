import Vue from 'vue';

import { FeedItem } from 'App/store/modules/feed';
import PageNav from 'App/components/page-nav';
import PostItem from 'App/components/post-item';

export default Vue.extend({
	name: 'feed-view',
	components: {
		'page-nav': PageNav,
		'post-item': PostItem,
	}, created() {
		this.loadFeed();
	},
	computed: {
		feed(): Array<FeedItem> {
			return this.$store.state.feed.feed;
		},
		page(): string {
			return this.$store.getters['feed/pageNumber'];
		}
	},
	methods: {
		loadFeed() {
			this.$store.dispatch('feed/load');
		},
		save(index: number) {
			this.$store.dispatch('feed/save', {
				index: index
			});
		},
		remove(index: number) {
			this.$store.dispatch('feed/remove', {
				index: index
			});
		},
		next() {
			this.$store.commit('feed/nextPage');
		},
		prev() {
			this.$store.commit('feed/prevPage');
		}
	},
	watch: {
		page() {
			this.loadFeed();
		}
	}
});
