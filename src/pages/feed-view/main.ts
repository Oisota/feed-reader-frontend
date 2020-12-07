import Vue from 'vue';
import format from 'date-fns/format';

import { FeedItem } from 'App/store/modules/feed';

import PageNav from 'App/components/page-nav';

interface FormattedFeedItem extends FeedItem {
	pubDateFormatted: string;
};

export default Vue.extend({
	name: 'feed-view',
	components: {
		'page-nav': PageNav,
	},
	created() {
		this.loadFeed();
	},
	computed: {
		feed() {
			return this.$store.state.feed.feed
				.map((item: FeedItem): FormattedFeedItem => {
					const newItem: FormattedFeedItem = (Object.assign({}, item) as FormattedFeedItem);
					newItem.pubDateFormatted = format(item.pubDate, "MMM do 'at' h:mm aaa");
					return newItem;
				});
		},
		page() {
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
