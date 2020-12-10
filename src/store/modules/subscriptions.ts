import { MutationTree, ActionTree } from 'vuex';

import { RootState } from '../state';
import http from 'App/http';

export interface Subscription {
	id: number | null;
	url: string;
}

export interface State {
	subscriptions: Array<Subscription>;
}

export const namespaced = true;

export const state: State = {
	subscriptions: [],
};

export const mutations: MutationTree<State> = {
	load(state, payload) {
		state.subscriptions = payload.feeds;
	},
	add(state, payload) {
		state.subscriptions.push({url: payload.url, id: null});
	},
	delete(state, payload) {
		state.subscriptions.splice(payload.index, 1);
	},
};

export const actions: ActionTree<State, RootState> = {
	async load(context): Promise<Response> {
		let resp: Response = Response.error();
		try {
			resp = await http.get('feeds');
		} catch (err) {
			console.log(err);
			return resp;
		}
		const data: any = await resp.json();
		if (data && data.data) {
			context.commit('load', { feeds: data.data});
		}
		return resp;
	},
	async add(context, payload) {
		let resp = Response.error();
		const data = {
			url: payload.url,
		};
		try {
			resp = await http.post('feeds', {
				json: data,
			});
		} catch (err) {
			console.log(err);
		}
		context.commit('add', {
			url: payload.url,
		});
		return resp;
	},
	async delete(context, payload) {
		let resp = Response.error();
		try {
			resp = await http.delete(`feeds/${payload.id}`);
		} catch (err) {
			console.log(err);
		}
		context.commit('delete', payload);
		return resp;
	},
};
