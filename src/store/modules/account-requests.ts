import { MutationTree, ActionTree } from 'vuex';

import { RootState } from '../state';
import http from 'App/http';

interface User {
	id: number;
	email: string;
	roleId: number;
}

export interface State {
	users: Array<User>;
}

export const namespaced = true;

export const state: State = {
	users: [],
};

export const mutations: MutationTree<State> = {
	load(state, payload) {
		state.users = payload
	},
};

export const actions: ActionTree<State, RootState> = {
	async load(context): Promise<Response> {
		let resp = Response.error();
		try {
			resp = await http.get('auth/account-requests');
		} catch (err) {
			console.log(err);
			return resp;
		}
		const data = (await resp.json() as any).data;
		context.commit('load', data);
		return resp;
	},
	async verify(_, payload): Promise<Response> {
		let resp = Response.error();
		try {
			resp = await http.post('auth/verify', {
				json: {
					id: payload.id,
				}
			});
		} catch (err) {
			console.log(err);
			return resp;
		}
		return resp;
	}
};
