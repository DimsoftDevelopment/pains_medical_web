import axios from 'axios';
import {config} from '../config';
import {getToken, getRefreshToken, setToken, setRefreshToken, getUser} from '../services/LocalStorage';

const handleError = async (error, instance) => {
  const refresh_token = getRefreshToken();
  if (error.response && error.response.status !== 401) {
    const errorData = {
      data: error.response.data,
      headers: error.response.headers,
      status: error.response.status,
    };
    throw errorData;
  } else if (error.response && error.response.status === 401 && refresh_token) {
    try {
      const originalRequest = error.config;
      const user = getUser();
      const {phone} = user || {};
      const conf = {
        method: 'POST',
        url: `${config.REACT_APP_API_URL}/authorization/refresh_token?refresh_token=${refresh_token}`,
        headers: { 
          'Content-Type': 'application/json',
        },
        data: {refresh_token, phone},
      };
      const response = await axios(conf)

      if(response?.data) {
        setToken(response.data?.token);
        setRefreshToken(response.data?.refresh_token);
        return instance.request({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${response.data?.token}`,
          },
        });
      }
    } catch (e) {
      const errorData = {
        headers: error.response.headers,
        status: error.response.status,
        data: error.response.data
      };
      throw errorData;
    }
  } else if (error.response && error.response.status === 401 && !refresh_token) {
    const errorData = {
      headers: error.response.headers,
      status: error.response.status,
      data: error.response.data
    };
    throw errorData;
  } else {
    const errorData = new Error((error.data.response && error.data.response.message) || '');
    errorData.response = error.data;
    throw errorData;
  }
};
const processRequest = (url = '', method = 'POST', data = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` || '',
  };
  const configs = {
    method,
    data,
    headers,
    url: config.REACT_APP_API_URL + url,
    credentials: 'same-origin'
  };
  const instance = axios.create();
  instance.interceptors.response.use(config => config, async error => handleError(error, instance));

  return instance(configs).then(res => res);
};

export {processRequest};
