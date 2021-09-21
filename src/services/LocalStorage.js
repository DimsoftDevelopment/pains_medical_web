import SecureLs from 'secure-ls';
import {LOCAL_STORAGE} from '../constants';

export const secureLs = new SecureLs();

export const getToken = () => secureLs.get(LOCAL_STORAGE.AUTH_TOKEN);
export const setToken = token => secureLs.set(LOCAL_STORAGE.AUTH_TOKEN, token);
export const removeToken = () => secureLs.remove(LOCAL_STORAGE.AUTH_TOKEN);

export const getRefreshToken = () => secureLs.get(LOCAL_STORAGE.REFRESH_TOKEN);
export const setRefreshToken = token => secureLs.set(LOCAL_STORAGE.REFRESH_TOKEN, token);
export const removeRefreshToken = () => secureLs.remove(LOCAL_STORAGE.REFRESH_TOKEN);

export const getUser = () => {
  const userJSON = localStorage.getItem(LOCAL_STORAGE.USER);
  if (userJSON) {
    return JSON.parse(userJSON);
  }
  return null;
};
export const setUser = user => {
  const userJSON = JSON.stringify(user);
  localStorage.setItem(LOCAL_STORAGE.USER, userJSON);
};
export const removeUser = () => localStorage.removeItem(LOCAL_STORAGE.USER);