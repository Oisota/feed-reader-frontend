import Vue from 'vue';

import NavBar from 'Components/nav-bar';

export default Vue.extend({
	name: 'app',
	components: {
		'nav-bar': NavBar,
	}
});
