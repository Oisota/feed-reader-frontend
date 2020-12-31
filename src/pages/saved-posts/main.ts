import Vue from 'vue';

import { FeedItem } from 'App/store/modules/saved-posts';
import PageNav from 'App/components/page-nav';
import PostItem from 'App/components/post-item';

export default Vue.extend({
	name: 'saved-posts',
	components: {
		'page-nav': PageNav,
		'post-item': PostItem,
	},
	created() {
		this.loadFeed();
	},
	computed: {
		feed(): Array<FeedItem> {
			return this.$store.state.savedPosts.feed;
		},
		page(): string {
			return this.$store.getters['savedPosts/pageNumber'];
		}
	},
	methods: {
		loadFeed() {
			this.$store.dispatch('savedPosts/load')
				.then(() => {
					window.scrollTo(0, 0);
				});
		},
		remove(index: number) {
			this.$store.dispatch('savedPosts/remove', {
				index: index
			});
		},
		next() {
			this.$store.commit('savedPosts/nextPage');
		},
		prev() {
			this.$store.commit('savedPosts/prevPage');
		}
	},
	watch: {
		page() {
			this.loadFeed();
		}
	}
});
