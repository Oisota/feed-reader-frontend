import Vue from 'vue';

declare module 'vue/types/vue' {
	interface VueConstructor {
		notify: any;
	}
	interface Vue {
		$notify: any;
	}
}
