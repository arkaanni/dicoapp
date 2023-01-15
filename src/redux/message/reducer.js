import { Action } from './action';

function messageReducer(message, action) {
  switch (action.type) {
    case Action.SET_MESSAGE: {
      return action.payload.message;
    }
    default: {
      return null;
    }
  }
}

export default messageReducer;
