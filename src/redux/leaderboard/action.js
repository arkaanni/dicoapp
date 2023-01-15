import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { leaderboardApi } from '../../api/dicodingforum';

const Action = {
  SET_LEADERBOARD: 'leaderboard/setLeaderboard',
};

const setLeaderboard = (leaderboard) => ({
  type: Action.SET_LEADERBOARD,
  payload: { leaderboard },
});

const fetchLeaderboard = () => async (dispatch) => {
  dispatch(showLoading());
  const { success, data } = await leaderboardApi.get();
  if (success) {
    dispatch(setLeaderboard(data.leaderboards));
  }
  dispatch(hideLoading());
};

export {
  Action,
  fetchLeaderboard,
};
