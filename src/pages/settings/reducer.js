import {PROFILE_ACTIONS, INITIAL_STATE} from './constants';

const profileState = (state = INITIAL_STATE, action) => {
  const {type, payload} = action || {};
  const {error} = payload || {};

  switch(type) {
    case PROFILE_ACTIONS.UPDATE_PROFILE_ERROR:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};

export {profileState};
