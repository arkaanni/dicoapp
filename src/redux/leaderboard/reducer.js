import { Action } from './action';

function leaderboardReducer(leaderboard = [], action = {}) {
  switch (action.type) {
    case Action.SET_LEADERBOARD: {
      return action.payload.leaderboard;
    }
    default: {
      return leaderboard;
    }
  }
}

export default leaderboardReducer;
