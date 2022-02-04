import {APPOINTMENTS_ACTIONS, INITIAL_STATE} from './constants';

const appointmentsState = (state = INITIAL_STATE, action) => {
  const {type, payload} = action || {};
  const {
    start_date,
    end_date,
    appointments,
    error,
  } = payload || {};
  switch(type) {
    case APPOINTMENTS_ACTIONS.GET_APPOINTMENTS:
      return {
        ...state,
        isLoading: true
      }
    case APPOINTMENTS_ACTIONS.GET_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        appointments,
        isLoading: false
      }
    case APPOINTMENTS_ACTIONS.GET_APPOINTMENTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error
      }
    case APPOINTMENTS_ACTIONS.CREATE_APPOINTMENT:
      return {
        ...state,
        isLoading: true  
      }
    default:
      return {
        ...state
      }
  }
};

export {appointmentsState};
