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
