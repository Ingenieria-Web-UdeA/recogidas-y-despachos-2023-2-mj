const SERVER_URL = 'https://t3orja4k27.execute-api.us-east-1.amazonaws.com/dev';

const API_ROUTES = {
  users: `${SERVER_URL}/users`,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { SERVER_URL, API_ROUTES, fetcher };
