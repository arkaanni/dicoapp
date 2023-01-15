import { Action } from './action';

function userReducer(user = null, action = {}) {
  switch (action.type) {
    case Action.SET_USER: {
      return action.payload.user;
    }
    case Action.UNSET_USER: {
      return null;
    }
    default: {
      return user;
    }
  }
}

function userListReducer(userList = [], action = {}) {
  switch (action.type) {
    case Action.SET_USER_LIST: {
      return action.payload.userList;
    }
    default: {
      return userList;
    }
  }
}

export {
  userReducer,
  userListReducer,
};
