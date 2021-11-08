import {DASHBOARD_ACTIONS, INITIAL_STATE} from './constants';

const dashboardState = (state = INITIAL_STATE, action) => {
  const {type, payload} = action || {};
  const {
    start_date,
    end_date,
    selectedUser,
    receptionMedications,
    all_reception_dates,
    mised_reception_dates,
    error,
  } = payload || {};
  switch(type) {
    case DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_BY_USER:
      return {
        ...state,
        start_date,
        end_date,
        selectedUser,
      };
    case DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_SUCCESS:
      return {
        ...state,
        all_reception_dates,
        mised_reception_dates,
      };
    case DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_BY_USER_SUCCESS:
      return {
        ...state,
        receptionMedications,
      };
    case DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_ERROR:
    case DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_BY_USER_ERROR:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};

export {dashboardState};
