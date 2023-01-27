import axios from 'axios';
export const BASE_URL = process.env.BASE_URL;
const authHeader = () => {
  const token = process.env.BACK_TOKEN;
  if (token) {
    return token;
  } else {
    return '';
  }
}

export function bearerHeader(token) {
  return 'Bearer ' + token;
}

const instance = axios.create();
instance.interceptors.request.use((config) => {
  config.headers.set('x-token', authHeader());
  return config;
});

export default instance;
