import SecureLs from 'secure-ls'
import {LOCAL_STORAGE} from '../constants';

export const secureLs = new SecureLs()

export const getToken = () => secureLs.get(LOCAL_STORAGE.AUTH_TOKEN)
export const setToken = (key, token) => secureLs.set(key, token)
export const removeToken = () => secureLs.remove(LOCAL_STORAGE.AUTH_TOKEN)

export const getRefreshToken = () => secureLs.get(LOCAL_STORAGE.REFRESH_TOKEN)
export const removeRefreshToken = () => secureLs.remove(LOCAL_STORAGE.REFRESH_TOKEN)


export const getUser = () => {
  const userJSON = localStorage.getItem(LOCAL_STORAGE.USER);
  if (userJSON) {
    return JSON.parse(userJSON);
  }
  return null;
}