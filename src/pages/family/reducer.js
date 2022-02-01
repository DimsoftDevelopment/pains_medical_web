import {FAMILY_ACTIONS, INITIAL_STATE} from './constants';

const familyState = (state = INITIAL_STATE, action) => {
  const {type, payload} = action || {};
  const {familyList = [], error} = payload || {};

  switch(type) {
    case FAMILY_ACTIONS.GET_FAMILY_LIST_SUCCESS:
      return {
        ...state,
        familyList,
      };
    case FAMILY_ACTIONS.GET_FAMILY_LIST_ERROR:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};

export {familyState};
