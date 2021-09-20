type PostFetchParams = {
  body?: any;
  headers?: any;
};

const createPostFetchInit = (params: PostFetchParams) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...params.headers,
    },
    body: params.body != null ? JSON.stringify(params.body) : undefined,
  };
};

export default createPostFetchInit;
