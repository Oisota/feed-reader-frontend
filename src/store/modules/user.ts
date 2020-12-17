import { MutationTree, ActionTree, GetterTree } from 'vuex';

import { RootState } from '../state';
import http from 'App/http';
import { Role } from 'App/util';

interface User {
	id: number | null;
	role: Role;
}

export interface State {
	user: User;
}

export const namespaced = true;

export const state: State = {
	user: {
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
	},
	setInfo(state, payload) {
		state.user.id = payload.id;
		state.user.role = Role[payload.role.name.toUpperCase() as string];
	},
	login(state, payload) {
		localStorage.setItem('user', JSON.stringify(state.user));
	},
	logout(state) {
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
	async logout(context) {
		let resp = Response.error();
		try {
			resp = await http.post('auth/logout');
		} catch (err) {
			console.log(err);
			return;
		}
		context.commit('logout');
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
		return state.user.id !== null;
	}
};
