import {MEDS_ACTIONS, INITIAL_STATE} from './constants';

const medsState = (state = INITIAL_STATE, action) => {
  const {type, payload} = action || {};
  const {meds, error} = payload || {};

  switch(type) {
    case MEDS_ACTIONS.GET_MEDS_SUCCESS:
      return {
        ...state,
        meds,
      };
    case MEDS_ACTIONS.GET_MEDS_ERROR:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};

export {medsState};
