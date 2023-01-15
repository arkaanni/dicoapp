import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { userApi, threadApi } from '../../api/dicodingforum';
import { setThreadList, setTagList, getTagListArray } from '../thread/action';
import { setUserList, setUser } from '../user/action';

const Action = {
  SET_IS_PRELOAD: 'preload/setIsPreload',
};

const setIsPreload = (isPreload) => ({
  type: Action.SET_IS_PRELOAD,
  payload: { isPreload },
});

const preloadState = () => async (dispatch) => {
  dispatch(showLoading());
  const userListResponse = await userApi.getAll();
  if (userListResponse.success) {
    dispatch(setUserList(userListResponse.data.users));
  }
  const userResponse = await userApi.profile();
  if (userResponse.success) {
    dispatch(setUser(userResponse.data.user));
  }
  const threadResponse = await threadApi.getAll();
  if (threadResponse.success) {
    const threadList = threadResponse.data.threads;
    const tagList = getTagListArray(threadList);
    dispatch(setThreadList(threadList));
    dispatch(setTagList(tagList));
  }
  dispatch(setIsPreload(false));
  dispatch(hideLoading());
};

export {
  Action,
  preloadState,
};
