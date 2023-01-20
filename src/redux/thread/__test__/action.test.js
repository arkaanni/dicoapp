import { Action, upvoteThread } from '../action';
import { displayMessage, MessageType } from '../../message/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { threadApi } from '../../../api/dicodingforum';

jest.mock('../../message/action');
jest.mock('../../../api/dicodingforum');

describe('upvoteThread thunk test', () => {
  beforeAll(() => {
    displayMessage.mockImplementation(() => {});
  });

  it('should dispatch displayMessage action when userId is null', async () => {
    const dispatch = jest.fn();
    const params = {
      threadId: 'thread-1',
      userId: null,
      unUpvote: false,
    };
    await upvoteThread(params)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(displayMessage());
    expect(displayMessage).toHaveBeenCalledWith({
      type: MessageType.ERROR,
      text: 'login untuk memberikan vote',
    });
  });

  it('should dispatch ADD_UPVOTE action when unUpvote is false', async () => {
    const dispatch = jest.fn();
    threadApi.votes.upVote.mockReturnValue(Promise.resolve({ success: true }));
    const params = {
      threadId: 'thread-1',
      userId: 123,
      unUpvote: false,
    };
    await upvoteThread(params)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: Action.ADD_UPVOTE,
      payload: {
        userId: params.userId
      },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(displayMessage());
    expect(displayMessage).toHaveBeenCalledWith({
      type: MessageType.INFO,
      text: 'berhasil memberikan vote',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});