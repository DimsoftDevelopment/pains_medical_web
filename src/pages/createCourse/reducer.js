import {CREATE_COURSE_ACTIONS, INITIAL_STATE} from './constants';

const createCourseState = (state = INITIAL_STATE, action) => {
  const { type, payload } = action || {};
  const { course, index, medication } = payload || {};

  switch(type) {
    case CREATE_COURSE_ACTIONS.UPDATE_COURSE_PROP:
      return {
        ...state,
        course,
      };
    case CREATE_COURSE_ACTIONS.SET_MEDICATION:
      return {
        ...state,
        selectedMedication: medication
      }
    case CREATE_COURSE_ACTIONS.SET_SELECTED_MEDICATION_INDEX:
      return {
        ...state,
        selectedMedicationIndex: index
      }
    default:
      return state;
  }
};

export {createCourseState};
