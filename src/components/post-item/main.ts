import Vue from 'vue';
import format from 'date-fns/format';

export default Vue.extend({
	name: 'post-item',
	props: {
		item: {
			required: true,
			type: Object,
		},
	},
	computed: {
		formattedDate(): string {
			return format(this.item.pubDate, "MMM do yyy 'at' h:mm aaa");
		}
	},
	methods: {
		save() {
			this.$emit('save');
		},
		remove() {
			this.$emit('remove');
		},
	},
});
