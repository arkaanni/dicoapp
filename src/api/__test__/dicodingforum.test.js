import { userApi } from '../dicodingforum';

describe('test dicodingforum api', () => {
  jest.spyOn(global, 'fetch');
  it('login should return success', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve({ status: 'success' }),
    }));
    const resp = await userApi.login({ email: 'test@mail.com', password: 'passwordtest' });
    expect(resp.success).toBeTruthy();
  });
});
