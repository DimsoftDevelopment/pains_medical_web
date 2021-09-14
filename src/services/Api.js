import axios from 'axios';
import {LOCAL_STORAGE} from '../constants';
import {config} from '../config';
// import {store} from '@redux/store'
// import {authActions} from '@actions'
import {getToken, getRefreshToken, setToken} from './LocalStorage'

export function processRequest(
  url = '',
  method = 'GET',
  data = {},
  json = true,
  responseType
) {
  const token = getToken()
  const refresh_token = getRefreshToken()
  const headers = {
    'Content-Type': json ? 'application/json' : 'multipart/form-data',
    Authorization: token ? `Bearer ${token}` : '',
  };
  
  const body = json ? JSON.stringify(data) : data;
  const configs = {
    method,
    baseURL: config.REACT_APP_API_URL + url,
    data: body,
    headers: headers,
    responseType: responseType ? responseType : 'json',
  };

  const instance =  axios.create()
  instance.interceptors.response.use(config => config, async (error) => {

    // on error interceptor
    const originalRequest = error.config;
    if(error?.response?.status === 401 && refresh_token) {
      try {
        const conf = { method: 'post',
        url: `${config.REACT_APP_API_URL}/authorization/refresh_token?refresh_token=${refresh_token}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : {}
      }

        const response = await axios(conf)

        if(response?.data) {
          console.log('CAHNGE TOKEN')
          setToken(LOCAL_STORAGE.AUTH_TOKEN, response.data?.token)
          setToken(LOCAL_STORAGE.REFRESH_TOKEN, response.data?.refresh_token)
          return instance.request({ ...originalRequest, headers: { ...originalRequest.headers, Authorization: `Bearer ${response.data?.token}` } })
        }
      } catch (e) {
        console.log('NOT AUTHORIZED')
        // store.dispatch(authActions.logout())
      }
    }

    return Promise.reject(error);
  })
  
  return instance(configs).then((res) => res);
}
