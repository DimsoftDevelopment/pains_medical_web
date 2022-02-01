import {CREATE_COURSE_ACTIONS, INITIAL_STATE} from './constants';

const createCourseState = (state = INITIAL_STATE, action) => {
  const {type, payload} = action || {};
  const {course} = payload || {};

  switch(type) {
    case CREATE_COURSE_ACTIONS.UPDATE_COURSE_PROP:
      return {
        ...state,
        course,
      };
    default:
      return state;
  }
};

export {createCourseState};
