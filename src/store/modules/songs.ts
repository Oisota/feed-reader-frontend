import { MutationTree, ActionTree } from 'vuex';
import pick from 'lodash/pick';
import { ResponsePromise } from 'ky';

import { RootState } from '../state';
import http from 'App/http';

interface Song {
	id: number;
	name: string;
	artist: string;
	album: string;
	genre: string;
	length: number;
}

export interface State {
	songs: Array<Song>;
}

export const namespaced = true;

export const state: State = {
	songs: [],
};

export const mutations: MutationTree<State> = {
	load(state, songs) {
		state.songs = songs;
	},
	update(state, payload) {
		state.songs.splice(payload.index, 1, payload);
	},
	create(state, payload) {
		state.songs.push(payload);
	},
	delete(state, payload) {
		state.songs.splice(payload.index, 1);
	},
};

export const actions: ActionTree<State, RootState> = {
	async load(context): Promise<Response> {
		let resp: Response = Response.error();
		const userID = context.rootState.user.user.id;
		try {
			resp = await http.get(`users/${userID}/songs`);
		} catch (err) {
			console.log(err);
			return resp;
		}
		const data: any = await resp.json();
		if (data && data.data) {
			context.commit('load', data.data);
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
	async create(context, payload) {
		let resp = Response.error();
		const userID = context.rootState.user.user.id;
		try {
			resp = await http.post(`users/${userID}/songs`, {
				json: payload,
			});
		} catch (err) {
			console.log(err);
		}
		const data = (await resp.json() as any).data;
		payload.id = data.id;
		const s = Object.assign({}, payload);
		context.commit('create', s);
		return s;
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
