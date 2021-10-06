import {DASHBOARD_ACTIONS, INITIAL_STATE} from './constants';

const dashboardState = (state = INITIAL_STATE, action) => {
  const {type, payload} = action || {};
  const {
    start_date,
    end_date,
    selectedUser,
    receptionMedications,
    error,
  } = payload || {};
  switch(type) {
    case DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS:
    case DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_BY_USER:
      return {
        ...state,
        start_date,
        end_date,
        selectedUser,
      };
    case DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_SUCCESS:
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
