import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { threadApi } from '../../api/dicodingforum';
import { displayMessage, MessageType } from '../message/action';

const Action = {
  SET_THREAD_LIST: 'thread/setThreadList',
  ADD_THREAD: 'thread/addThread',
  SET_THREAD_DETAIL: 'thread/setThreadDetail',
  SET_TAG_LIST: 'thread/setTagList',
  ADD_UPVOTE: 'thread/addUpvote',
  UNDO_UPVOTE: 'thread/undoUpvote',
  ADD_COMMENT_UPVOTE: 'thread/addCommentUpvote',
  UNDO_COMMENT_UPVOTE: 'thread/undoCommentUpvote',
};

const setThreadList = (threadList) => ({
  type: Action.SET_THREAD_LIST,
  payload: { threadList },
});

const addThread = (thread) => ({
  type: Action.ADD_THREAD,
  payload: { thread },
});

const setThread = (thread) => ({
  type: Action.SET_THREAD_DETAIL,
  payload: { thread },
});

const addCommentUpvote = (commentId, userId) => ({
  type: Action.ADD_COMMENT_UPVOTE,
  payload: { commentId, userId },
});

const undoCommentUpvote = (commentId, userId) => ({
  type: Action.UNDO_COMMENT_UPVOTE,
  payload: { commentId, userId },
});

const setTagList = (tagList) => ({
  type: Action.SET_TAG_LIST,
  payload: { tagList },
});

const addThreadUpvote = (userId) => ({
  type: Action.ADD_UPVOTE,
  payload: { userId },
});

const undoThreadUpvote = (userId) => ({
  type: Action.UNDO_UPVOTE,
  payload: { userId },
});

const fetchThreadDetail = ({ threadId }) => async (dispatch) => {
  dispatch(showLoading());
  const { success, data } = await threadApi.get(threadId);
  if (success) {
    dispatch(setThread(data.detailThread));
  } else {
    dispatch(displayMessage({ type: MessageType.ERROR, text: 'gagal memuat thread' }));
  }
  dispatch(hideLoading());
};

function getTagListArray(arr) {
  const set = {};
  arr.forEach((it) => {
    const tag = set[it.category];
    if (tag) {
      set[it.category] = tag + 1;
    } else {
      set[it.category] = 1;
    }
  });
  return set;
}

const createThread = ({ title, category, body }) => async (dispatch, getState) => {
  dispatch(showLoading());
  const { success, data, message } = await threadApi.create({ title, body, category });
  const messageUI = {
    type: MessageType.ERROR,
    text: message,
  };
  if (success) {
    dispatch(addThread(data.thread));
    messageUI.type = MessageType.INFO;
    messageUI.text = 'berhasil membuat thread';
    const { threadList } = getState();
    const tagList = getTagListArray([...threadList, { category }]);
    dispatch(setTagList(tagList));
  }
  dispatch(hideLoading());
  dispatch(displayMessage(messageUI));
  return Promise.resolve({ success });
};

const upvoteThread = ({ threadId, userId, unUpvote }) => async (dispatch) => {
  if (userId === null) {
    dispatch(displayMessage({
      type: MessageType.ERROR,
      text: 'login untuk memberikan vote',
    }));
    return;
  }
  dispatch(showLoading());
  let voteFunc = threadApi.votes.upVote;
  const message = {
    type: MessageType.INFO,
    text: 'berhasil memberikan vote',
  };
  if (unUpvote) {
    voteFunc = threadApi.votes.neutralize;
    dispatch(undoThreadUpvote(userId));
    message.text = 'berhasil membatalkan upvote';
  } else {
    dispatch(addThreadUpvote(userId));
  }
  const { success } = await voteFunc({ threadId });
  if (!success) {
    dispatch(undoThreadUpvote());
    message.type = MessageType.ERROR;
    message.text = 'login untuk memberi vote';
  }
  dispatch(hideLoading());
  dispatch(displayMessage(message));
};

export {
  Action,
  addThread,
  setThreadList,
  setThread,
  setTagList,
  fetchThreadDetail,
  createThread,
  getTagListArray,
  upvoteThread,
  undoThreadUpvote,
  addCommentUpvote,
  undoCommentUpvote,
};
