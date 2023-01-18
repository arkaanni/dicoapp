import { Action } from '../action';
import { threadDetailReducer } from '../reducer';

const initialState = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [11, 22],
      downVotesBy: [],
    },
  ],
};

describe('threadDetailReducer test', () => {
  it('should return thread detail with new upvotes given ADD_UPVOTE action', () => {
    const action = {
      type: Action.ADD_UPVOTE,
      payload: {
        userId: 123,
      },
    };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState.upVotesBy).toContain(action.payload.userId);
  });

  it('should return thread detail with new comment upvotes given ADD_COMMENT_UPVOTE action', () => {
    const action = {
      type: Action.ADD_COMMENT_UPVOTE,
      payload: {
        commentId: initialState.comments[0]?.id,
        userId: 123,
      },
    };
    const oldCommentUpvotesLength = initialState.comments[0].upVotesBy.length;
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState.comments[0].upVotesBy.length).toEqual(oldCommentUpvotesLength + 1);
    expect(nextState.comments[0].upVotesBy).toContain(action.payload.userId);
  });
});
