import Vue from 'vue';

export default Vue.extend({
	name: 'x-card',
	props: {
		title: {
			type: String,
			required: true,
		},
	},
});
