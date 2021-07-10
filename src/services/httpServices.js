import axios from 'axios';

import { StatusCodes } from '../utilities/Enums';
import logger from './logger';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  async config => {
    config.headers.Authorization = `Bearer   ${localStorage.getItem('token')}`;
    return config;
  },
  error => {
    logger.log(error);
    Promise.reject(error);
  }
);

axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= StatusCodes.BadRequest && error.response.status < StatusCodes.InternalServerError;
  if (!expectedError) {
    logger.log(error);
    //  window.location = "/error"
  }

  // const originalRequest = error.config;
  // if (error.response.status === 401 && !originalRequest._retry) {
  //     getToken().then(res => {
  //         localStorage.setItem("token", res.data.access_token);
  //         originalRequest._retry = true;
  //     });
  //     return axios(originalRequest);
  // }
  return Promise.reject(error.response);
});

const getToken = () =>
  axios.post(
    'connect/token',
    `grant_type=${process.env.REACT_APP_GRANT_TYPE}&scope=${process.env.REACT_APP_SCOPE}&client_id=${process.env.REACT_APP_ClIENT_ID}&client_secret=${process.env.REACT_APP_ClIENT_SECRET}`
  );
const initial = () => {
  getToken().then(
    res => localStorage.setItem('token', res.data.access_token),
    error => false
  );
  return true;
};

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
  patch: axios.patch,
  initial,
  getToken,
};
