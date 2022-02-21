import {CREATE_COURSE_ACTIONS} from './constants';

export const updateCourseProp = course => ({
  type: CREATE_COURSE_ACTIONS.UPDATE_COURSE_PROP,
  payload: {course},
});

export const setMedicationAction = medication => ({
  type: CREATE_COURSE_ACTIONS.SET_MEDICATION,
  payload: { medication },
});

export const setSelectedMedicationIndexAction = index => ({
  type: CREATE_COURSE_ACTIONS.SET_SELECTED_MEDICATION_INDEX,
  payload: { index },
});
