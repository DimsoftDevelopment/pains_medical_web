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
    takeUntakePillData,
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
    case DASHBOARD_ACTIONS.TAKE_UNTAKE_PILL_SUCCESS: {
      const allReceptions = [...state.receptionMedications];
      allReceptions.forEach((course, courseIndex) => {
        course.receptions.data.forEach((reception, index) => {
          if (reception.attributes.id === takeUntakePillData.id) {
            allReceptions[courseIndex].receptions.data[index].attributes = {
              ...allReceptions[courseIndex].receptions.data[index].attributes,
              status: takeUntakePillData.status,
            };
          }
        });
      });
      return {
        ...state,
        receptionMedications: allReceptions,
      };
    }
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
