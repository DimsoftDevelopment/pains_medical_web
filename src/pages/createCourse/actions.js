import {CREATE_COURSE_ACTIONS} from './constants';

export const updateCourseProp = course => ({
  type: CREATE_COURSE_ACTIONS.UPDATE_COURSE_PROP,
  payload: {course},
});
