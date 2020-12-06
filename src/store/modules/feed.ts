import { MutationTree, ActionTree } from 'vuex';
import pick from 'lodash/pick';
import { ResponsePromise } from 'ky';

import { RootState } from '../state';
import http from 'App/http';

export interface FeedItem {
	id: number;
	title: string;
	pubDate: Date;
	url: string;
	feedTitle: string;
	feedUrl: string;
	saved: boolean;
}

export interface State {
	feed: Array<FeedItem>;
}

export const namespaced = true;

export const state: State = {
	feed: [],
};

export const mutations: MutationTree<State> = {
	load(state, payload) {
		state.feed = payload.feed;
	},
	update(state, payload) {
		state.feed.splice(payload.index, 1, payload.item);
	},
	delete(state, payload) {
		state.feed.splice(payload.index, 1);
	},
};

export const actions: ActionTree<State, RootState> = {
	async load(context): Promise<Response> {
		let resp: Response = Response.error();
		try {
			resp = await http.get('posts');
		} catch (err) {
			console.log(err);
			return resp;
		}
		const data: any = await resp.json();
		if (data && data.data) {
			context.commit('load', { feed: data.data});
		}
		return resp;
	},
	async update(context, payload) {
		let resp = Response.error();
		const userID = context.rootState.user.user.id;
		const s = Object.assign({}, payload);
		const data = pick(payload, [
			'name', 'artist', 'album', 'genre', 'length'
		]);
		try {
			resp = await http.put(`users/${userID}/songs/${payload.id}`, {
				json: data,
			});
		} catch (err) {
			console.log(err);
		}
		context.commit('update', s);
		return resp;
	},
	async delete(context, payload) {
		let resp = Response.error();
		const userID = context.rootState.user.user.id;
		try {
			resp = await http.delete(`users/${userID}/songs/${payload.id}`);
		} catch (err) {
			console.log(err);
		}
		context.commit('delete', payload);
		return resp;
	},
};
