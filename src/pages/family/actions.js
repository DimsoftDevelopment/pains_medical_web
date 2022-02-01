import {FAMILY_ACTIONS} from './constants';

export const getFamilyList = () => ({
  type: FAMILY_ACTIONS.GET_FAMILY_LIST,
});

export const getFamilyListSuccess = familyList => ({
  type: FAMILY_ACTIONS.GET_FAMILY_LIST_SUCCESS,
  payload: {familyList},
});

export const getFamilyListError = error => ({
  type: FAMILY_ACTIONS.GET_FAMILY_LIST_ERROR,
  payload: {error},
});

export const inviteMember = phone => ({
  type: FAMILY_ACTIONS.INVITE_MEMBER,
  payload: {phone},
});

export const inviteMemberSuccess = () => ({
  type: FAMILY_ACTIONS.INVITE_MEMBER_SUCCESS,
});

export const inviteMemberError = error => ({
  type: FAMILY_ACTIONS.INVITE_MEMBER_ERROR,
  payload: {error},
});
