import { MutationTree, ActionTree, GetterTree } from 'vuex';

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
	page: number,
}

export const namespaced = true;

export const state: State = {
	feed: [],
	page: 0,
};

export const mutations: MutationTree<State> = {
	load(state, payload) {
		state.feed = payload.feed;
	},
	save(state, payload) {
		state.feed[payload.index].saved = true;
	},
	delete(state, payload) {
		state.feed.splice(payload.index, 1);
	},
	nextPage(state) {
		state.page += 1;
	},
	prevPage(state) {
		if (state.page - 1 >= 0) {
			state.page -= 1;
		}
	},
};

export const actions: ActionTree<State, RootState> = {
	async load(context): Promise<Response> {
		let resp: Response = Response.error();
		try {
			resp = await http.get('posts', {
				searchParams: {
					page: context.state.page,
				}
			});
		} catch (err) {
			console.log(err);
			return resp;
		}
		const data: any = await resp.json();
		if (data && data.data) {
			const feed = data.data
				.map((f: any) => {
					f.pubDate = new Date(f.pubDate * 1000);
					return f;
				});
			context.commit('load', { feed });
		}
		return resp;
	},
	async save(context, payload): Promise<Response> {
		let resp = Response.error();
		const post = context.state.feed[payload.index];
		try {
			resp = await http.put(`posts/${post.id}/save`);
		} catch (err) {
			console.log(err);
		}
		context.commit('save', payload);
		return resp;
	},
	async remove(context, payload): Promise<Response> {
		let resp = Response.error();
		const post = context.state.feed[payload.index];
		try {
			resp = await http.delete(`posts/${post.id}`);
		} catch (err) {
			console.log(err);
		}
		context.commit('delete', payload);
		return resp;
	},
};

export const  getters: GetterTree<State, RootState> = {
	pageNumber(state): number {
		return state.page + 1;
	}
};
