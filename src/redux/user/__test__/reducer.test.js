import { Action } from '../action';
import { userReducer } from '../reducer';

describe('userReducer test', () => {
  it('should return initial state given invalid action', () => {
    const initialState = { name: 'test' };
    const nextState = userReducer(initialState, { type: 'invalid' });
    expect(nextState).toEqual(initialState);
  });

  it('should return null given UNSET_USER action', () => {
    const initialState = { name: 'test' };
    const nextState = userReducer(initialState, { type: Action.UNSET_USER });
    expect(nextState).toBeNull();
  });

  it('should return user given SET_USER action', () => {
    const initialState = { name: 'test' };
    const action = {
      type: Action.SET_USER,
      payload: {
        user: {
          name: 'test2',
        },
      },
    };
    const nextState = userReducer(initialState, action);
    expect(nextState).toEqual(action.payload.user);
  });
});
