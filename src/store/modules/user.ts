import { MutationTree, ActionTree, GetterTree } from 'vuex';

import { RootState } from '../state';
import http from 'App/http';
import { Role } from 'App/util';

interface User {
	token: string | null;
	id: number | null;
	role: Role;
}

export interface State {
	user: User;
}

export const namespaced = true;

export const state: State = {
	user: {
		token: null,
		id: null,
		role: Role.ANY,
	},
};

export const mutations: MutationTree<State> = {
	load(state) {
		const userStr = localStorage.getItem('user');
		if (userStr === null) {
			return;
		}
		const user = JSON.parse(userStr);
		state.user.token = user.token;
	},
	setInfo(state, payload) {
		state.user.id = payload.id;
		state.user.role = Role[payload.role.name.toUpperCase() as string];
	},
	login(state, payload) {
		state.user.token = payload.token;
		localStorage.setItem('user', JSON.stringify(state.user));
	},
	logout(state) {
		state.user.token = null;
		state.user.role = Role.ANY;
		state.user.id = null;
		localStorage.removeItem('user');
	},
};

export const actions: ActionTree<State, RootState> = {
	async login(context, payload) {
		let resp = Response.error();
		try {
			resp = await http.post('auth/login', {
				json: {
					email: payload.email,
					password: payload.password
				}
			});
		} catch (err) {
			console.log(err);
			return;
		}
		const data = (await resp.json() as any).data;
		context.commit('login', data);
		return resp;
	},
	async load(context): Promise<Response> {
		context.commit('load');
		let resp = Response.error();
		if (!context.getters.loggedIn) {
			return resp;
		}
		try {
			resp = await http.get('me');
		} catch (err) {
			console.log(err);
			return resp;
		}
		const data = (await resp.json() as any).data;
		context.commit('setInfo', data);
		return resp;
	},
	async register(_, payload): Promise<Response> {
		let resp = Response.error();
		try {
			resp = await http.post('register', {
				json: {
					email: payload.email,
					password: payload.password
				}
			});
		} catch (err) {
			console.log(err);
			return resp;
		}
		return resp;
	}
};

export const getters: GetterTree<State, RootState> = {
	loggedIn(state) {
		return state.user.token !== null;
	}
};
