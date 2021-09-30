import {PROFILE_ACTIONS} from './constants';

export const updateProfile = user => ({
  type: PROFILE_ACTIONS.UPDATE_PROFILE,
  payload: {user},
});

export const updateProfileSuccess = user => ({
  type: PROFILE_ACTIONS.UPDATE_PROFILE_SUCCESS,
  payload: {user},
});

export const updateProfileError = error => ({
  type: PROFILE_ACTIONS.UPDATE_PROFILE_ERROR,
  payload: {error},
});

export const changeAvatar = user => ({
  type: PROFILE_ACTIONS.CHANGE_AVATAR,
  payload: {user},
});

export const changeAvatarSuccess = user => ({
  type: PROFILE_ACTIONS.CHANGE_AVATAR_SUCCESS,
  payload: {user},
});

export const changeAvatarError = error => ({
  type: PROFILE_ACTIONS.CHANGE_AVATAR_ERROR,
  payload: {error},
});

export const deleteAccount = user_id => ({
  type: PROFILE_ACTIONS.DELETE_ACCOUNT,
  payload: {user_id},
});

export const deleteAccountSuccess = () => ({
  type: PROFILE_ACTIONS.DELETE_ACCOUNT_SUCCESS,
});

export const deleteAccountError = error => ({
  type: PROFILE_ACTIONS.DELETE_ACCOUNT_ERROR,
  payload: {error},
});
