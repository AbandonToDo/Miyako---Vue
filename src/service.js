import axios from 'axios';
import { getToken } from '@/utils/handleToken';
import { Message } from 'element-ui';

const service = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    //设置Token
    config.headers['Authorization'] = getToken('token');
    return config;
  },
  (error) => {
    // do something with request error
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const { status, message } = response.data;
    if (status !== 200) {
      Message({ message: message || 'Error', type: 'error', duration: 5 * 1000 });
      return Promise.reject(new Error(message || 'Error'));
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default service;
