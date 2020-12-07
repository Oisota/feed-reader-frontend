import Vue from 'vue';

export default Vue.extend({
	name: 'page-nav',
	props: {
		page: {
			type: Number,
			required: true,
		}
	},
	methods: {
		next() {
			this.$emit('next');
		},
		prev() {
			this.$emit('prev');
		}
	},
});
