import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { RootState } from './state';
import modules from './modules';
import config from '../config';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
	strict: config.ENV !== 'production',
	modules,
};

export default new Vuex.Store<RootState>(store);
