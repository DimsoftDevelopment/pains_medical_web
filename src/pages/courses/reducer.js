import {COURSES_ACTIONS, INITIAL_STATE} from './constants';

const coursesState = (state = INITIAL_STATE, action) => {
  const {type, payload} = action || {};
  const {courses, error} = payload || {};

  switch(type) {
    case COURSES_ACTIONS.GET_COURSES_SUCCESS:
      return {
        ...state,
        courses,
      };
    case COURSES_ACTIONS.GET_COURSES_ERROR:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};

export {coursesState};
