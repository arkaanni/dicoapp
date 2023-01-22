import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  Action, addThread, createThread, setTagList, upvoteThread,
} from '../action';
import { displayMessage, MessageType } from '../../message/action';
import { threadApi } from '../../../api/dicodingforum';

/**
 * test scenario
 * 
 * - upvoteThread thunk test
 *  - should dispatch displayMessage thunk when userId is null
 *  - should dispatch ADD_UPVOTE action when unUpvote is false
 *  - should dispatch UNDO_UPVOTE action when unUpvote is true
 * 
 * - createThread thunk test
 *  - should dispatch ADD_THREAD and SET_TAG_LIST action when create thread success
 */

jest.mock('../../message/action');
jest.mock('../../../api/dicodingforum');

describe('redux thread test', () => {
  beforeAll(() => {
    displayMessage.mockImplementation(() => {});
  });

  describe('upvoteThread thunk test', () => {
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
        text: 'login untuk memberikan upvote',
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
          userId: params.userId,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledWith(displayMessage());
      expect(displayMessage).toHaveBeenCalledWith({
        type: MessageType.INFO,
        text: 'berhasil memberikan upvote',
      });
      expect(dispatch).toHaveBeenCalledTimes(4);
    });
    
    it('should dispatch UNDO_UPVOTE action when unUpvote is true', async () => {
      const dispatch = jest.fn();
      threadApi.votes.neutralize.mockReturnValue(Promise.resolve({ success: true }));
      const params = {
        threadId: 'thread-1',
        userId: 123,
        unUpvote: true,
      };
      await upvoteThread(params)(dispatch);
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: Action.UNDO_UPVOTE,
        payload: {
          userId: params.userId,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledWith(displayMessage());
      expect(displayMessage).toHaveBeenCalledWith({
        type: MessageType.INFO,
        text: 'berhasil membatalkan upvote',
      });
      expect(dispatch).toHaveBeenCalledTimes(4);
    });
  });
    
  describe('createThread thunk test', () => {
    it('should dispatch ADD_THREAD and SET_TAG_LIST action when create thread success', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        threadList: [],
      }));
      const mockThread = {
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
        comments: [],
      };
      threadApi.create.mockReturnValue(Promise.resolve({
        success: true,
        data: { thread: mockThread },
        message: 'berhasil membuat thread',
      }));
      await createThread({
        title: mockThread.title,
        category: mockThread.category,
        body: mockThread.body,
      })(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(addThread(mockThread));
      expect(dispatch).toHaveBeenCalledWith(setTagList({ General: 1 }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledWith(displayMessage());
      expect(displayMessage).toHaveBeenCalledWith({
        type: MessageType.INFO,
        text: 'berhasil membuat thread',
      });
      expect(dispatch).toHaveBeenCalledTimes(5);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
