import Vue from 'vue';
import format from 'date-fns/format';

import { FeedItem } from 'App/store/modules/feed';

interface FormattedFeedItem extends FeedItem {
	pubDateFormatted: string;
};

export default Vue.extend({
	name: 'feed-view',
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
