const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const getAccessToken = () => localStorage.getItem('accessToken');

const getBearerToken = (secure) => {
  if (secure === false) return null;
  const token = getAccessToken();
  if (token) {
    return `Bearer ${token}`;
  }
  return null;
};

const getRequest = ({ endpoint, secure = true }) => fetch(BASE_URL + endpoint, {
  method: 'get',
  headers: {
    Accept: 'application/json',
    Authorization: getBearerToken(secure),
  },
});

const postRequest = ({ endpoint, body = {}, secure = true }) => fetch(BASE_URL + endpoint, {
  method: 'post',
  body: JSON.stringify(body),
  headers: {
    Accept: 'application/json',
    Authorization: getBearerToken(secure),
    'Content-Type': 'application/json',
  },
});

const getJson = async (response) => {
  let json;
  try {
    json = await response.json();
  } catch (e) {
    json = { status: 'fail' };
  }
  if (json.status !== 'success') {
    return { success: false, data: null, message: json.message };
  }
  return { success: true, data: json.data, message: json.message };
};

const userApi = {
  register: async ({ name, email, password }) => {
    const response = await postRequest({
      endpoint: '/register',
      body: { name, email, password },
      secure: false,
    });
    return getJson(response);
  },
  login: async ({ email, password }) => {
    const response = await postRequest({
      endpoint: '/login',
      body: { email, password },
      secure: false,
    });
    return getJson(response);
  },
  getAll: async () => getJson(await getRequest({ endpoint: '/users' })),
  profile: async () => getJson(await getRequest({ endpoint: '/users/me' })),
  setAccessToken: (token) => localStorage.setItem('accessToken', token),
};

const threadApi = {
  create: async ({ title, body, category = null }) => {
    const response = await postRequest({
      endpoint: '/threads',
      body: { title, body, category },
    });
    return getJson(response);
  },
  getAll: async () => getJson(await getRequest({ endpoint: '/threads', secure: false })),
  get: async (id) => getJson(await getRequest({ endpoint: `/threads/${id}`, secure: false })),
  comments: {
    create: async ({ threadId, content }) => {
      const response = await postRequest({
        endpoint: `/threads/${threadId}/comments`,
        body: { content },
      });
      return getJson(response);
    },
    votes: {
      upVote: async ({ threadId, commentId }) => {
        const response = await postRequest({
          endpoint: `/threads/${threadId}/comments/${commentId}/up-vote`,
        });
        return getJson(response);
      },
      downVote: async ({ threadId, commentId }) => {
        const response = await postRequest({
          endpoint: `/threads/${threadId}/comments/${commentId}/down-vote`,
        });
        return getJson(response);
      },
      neutralize: async ({ threadId, commentId }) => {
        const response = await postRequest({
          endpoint: `/threads/${threadId}/comments/${commentId}/neutral-vote`,
        });
        return getJson(response);
      },
    },
  },
  votes: {
    upVote: async ({ threadId }) => {
      const response = await postRequest({
        endpoint: `/threads/${threadId}/up-vote`,
      });
      return getJson(response);
    },
    downVote: async ({ threadId }) => {
      const response = await postRequest({
        endpoint: `/threads/${threadId}/down-vote`,
      });
      return getJson(response);
    },
    neutralize: async ({ threadId }) => {
      const response = await postRequest({
        endpoint: `/threads/${threadId}/neutral-vote`,
      });
      return getJson(response);
    },
  },
};

const leaderboardApi = {
  get: async () => getJson(await getRequest({ endpoint: '/leaderboards', secure: false })),
};

export {
  userApi,
  threadApi,
  leaderboardApi,
  BASE_URL as baseUrl,
};
