import { State as UserState } from './modules/user';
import { State as FeedState } from './modules/feed';
import { State as SubscriptionState } from './modules/feed';

export interface RootState {
	user: UserState;
	feed: FeedState;
	subscriptions: SubscriptionState;
}
