import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { userApi } from '../../api/dicodingforum';
import { displayMessage, MessageType } from '../message/action';

const Action = {
  SET_USER: 'user/setUser',
  UNSET_USER: 'user/unsetUser',
  SET_USER_LIST: 'user/setUserList',
};

const setUser = (user) => ({
  type: Action.SET_USER,
  payload: { user },
});

const unsetUser = () => ({
  type: Action.UNSET_USER,
});

const setUserList = (userList) => ({
  type: Action.SET_USER_LIST,
  payload: { userList },
});

const loginUser = ({ email, password }) => async (dispatch) => {
  dispatch(showLoading());
  const { success, data, message } = await userApi.login({ email, password });
  const messageUi = {
    type: MessageType.ERROR,
    text: message,
  };
  if (success) {
    messageUi.type = MessageType.INFO;
    messageUi.text = 'berhasil login';
    userApi.setAccessToken(data.token);
    const userResponse = await userApi.profile();
    if (userResponse.success) {
      dispatch(setUser(userResponse.data.user));
    }
  }
  dispatch(hideLoading());
  dispatch(displayMessage(messageUi));
  return Promise.resolve({ success });
};

const logoutUser = () => (dispatch) => {
  dispatch(showLoading());
  userApi.setAccessToken('');
  dispatch(setUser(null));
  dispatch(hideLoading());
};

const registerUser = ({ name, email, password }) => async (dispatch) => {
  dispatch(showLoading());
  const { success, message } = await userApi.register({ name, email, password });
  const messageUi = {
    type: MessageType.ERROR,
    text: message,
  };
  if (success) {
    messageUi.type = MessageType.INFO;
    messageUi.text = 'berhasil register';
  }
  dispatch(hideLoading());
  dispatch(displayMessage(messageUi));
  return Promise.resolve({ success });
};

export {
  Action,
  loginUser,
  setUser,
  setUserList,
  unsetUser,
  registerUser,
  logoutUser,
};
