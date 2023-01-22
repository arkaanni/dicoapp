import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { loginUser, setUser } from '../action';
import { userApi } from '../../../api/dicodingforum';
import { displayMessage, MessageType } from '../../message/action';

/**
 * test scenario
 * - loginUser thunk test
 *  - should dispatch displayMessage thunk when login failed
 *  - should dispatch SET_USER action when login success
 */

jest.mock('../../../api/dicodingforum');
jest.mock('../../message/action');

describe('loginUser thunk test', () => {
  beforeAll(() => {
    displayMessage.mockImplementation(() => {});
  });

  it('should dispatch displayMessage when login failed', async () => {
    const dispatch = jest.fn();
    const mockResponse = {
      data: null,
      message: 'wrong username or password',
      success: false,
    };
    userApi.login.mockReturnValue(Promise.resolve(mockResponse));
    const params = {
      email: 'test@test.com',
      password: 'passwordtest',
    };
    const result = await loginUser(params)(dispatch);
    expect(result.success).toBeFalsy();
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(displayMessage());
    expect(displayMessage).toHaveBeenCalledWith({
      type: MessageType.ERROR,
      text: mockResponse.message,
    });
  });

  it('should dispatch SET_USER action when login success', async () => {
    const dispatch = jest.fn();
    const mockResponse = {
      success: true,
      message: 'ok',
      data: {
        token: 'qwertyuiop',
      },
    };
    const mockUserResponse = {
      success: true,
      message: 'ok',
      data: {
        user: {
          id: 'user-1',
          name: 'user 1',
          email: 'test@test.com',
          avatar: '',
        },
      },
    };
    const params = {
      email: 'test@test.com',
      password: 'passwordtest',
    };
    userApi.login.mockReturnValue(Promise.resolve(mockResponse));
    userApi.profile.mockReturnValue(Promise.resolve(mockUserResponse));
    userApi.setAccessToken.mockImplementation(() => {});
    const result = await loginUser(params)(dispatch);
    expect(result.success).toBeTruthy();
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setUser(mockUserResponse.data.user));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(displayMessage());
    expect(displayMessage).toHaveBeenCalledWith({
      type: MessageType.INFO,
      text: 'berhasil login',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
