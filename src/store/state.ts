import { State as UserState } from './modules/user';
import { State as SongsState } from './modules/songs';

export interface RootState {
	user: UserState;
	songs: SongsState;
}
