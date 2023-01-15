import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { threadListReducer, threadDetailReducer, tagListReducer } from './thread/reducer';
import { userReducer, userListReducer } from './user/reducer';
import leaderboardReducer from './leaderboard/reducer';
import messageReducer from './message/reducer';
import isPreloadReducer from './preload/reducer';

const store = configureStore({
  reducer: {
    threadList: threadListReducer,
    user: userReducer,
    userList: userListReducer,
    threadDetail: threadDetailReducer,
    leaderboard: leaderboardReducer,
    message: messageReducer,
    loadingBar: loadingBarReducer,
    tagList: tagListReducer,
    isPreload: isPreloadReducer,
  },
});

export default store;
