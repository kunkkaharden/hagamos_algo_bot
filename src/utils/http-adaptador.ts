import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
export const BASE_URL = process.env.BASE_URL;
const authHeader = () => {
  const token = process.env.BACK_TOKEN;
  if (token) {
    return token;
  } else {
    return '';
  }
}


const instance = axios.create();
instance.interceptors.request.use((config) => {
  config.headers.set('x-token', authHeader());
  return config;
});

export default instance;
