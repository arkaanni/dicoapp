import { Action } from './action';

function threadListReducer(threadList = [], action = {}) {
  switch (action.type) {
    case Action.SET_THREAD_LIST: {
      return action.payload.threadList;
    }
    case Action.ADD_THREAD: {
      return [action.payload.thread, ...threadList];
    }
    default: {
      return threadList;
    }
  }
}

function threadDetailReducer(thread = null, action = {}) {
  switch (action.type) {
    case Action.SET_THREAD_DETAIL: {
      return action.payload.thread;
    }
    case Action.ADD_UPVOTE: {
      const upvotes = [...thread.upVotesBy, action.payload.userId];
      return { ...thread, upVotesBy: upvotes };
    }
    case Action.UNDO_UPVOTE: {
      const upvotes = thread.upVotesBy.filter((it) => it !== action.payload.userId);
      return { ...thread, upVotesBy: upvotes };
    }
    case Action.ADD_COMMENT_UPVOTE: {
      const comments = thread.comments.map((it) => {
        if (it.id === action.payload.commentId) {
          const upvotes = [...it.upVotesBy, action.payload.userId];
          return { ...it, upVotesBy: upvotes };
        }
        return it;
      });
      return { ...thread, comments };
    }
    case Action.UNDO_COMMENT_UPVOTE: {
      const comments = thread.comments.map((it) => {
        if (it.id === action.payload.commentId) {
          const upvotes = it.upVotesBy.filter((user) => user !== action.payload.userId);
          return { ...it, upVotesBy: upvotes };
        }
        return it;
      });
      return { ...thread, comments };
    }
    default: {
      return thread;
    }
  }
}

function tagListReducer(tagList = [], action = {}) {
  switch (action.type) {
    case Action.SET_TAG_LIST: {
      return action.payload.tagList;
    }
    default: {
      return tagList;
    }
  }
}

export {
  threadListReducer,
  threadDetailReducer,
  tagListReducer,
};
