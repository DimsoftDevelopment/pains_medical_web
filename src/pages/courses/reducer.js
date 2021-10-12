import {COURSES_ACTIONS, INITIAL_STATE} from './constants';

const coursesState = (state = INITIAL_STATE, action) => {
  const {type, payload} = action || {};
  const {courses, course, id, error} = payload || {};

  switch(type) {
    case COURSES_ACTIONS.GET_COURSES_SUCCESS:
      return {
        ...state,
        courses,
      };
    case COURSES_ACTIONS.GET_COURSE_BY_MEMBER_SUCCESS:
      return {
        ...state,
        courses,
      };
    case COURSES_ACTIONS.GET_COURSE_SUCCESS:
      return {
        ...state,
        course,
      };
    case COURSES_ACTIONS.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        course,
        courses: [...state.courses, ...[course]],
      };
    case COURSES_ACTIONS.UPDATE_COURSE_SUCCESS: {
      const updatedCourse = [...state.courses];
      updatedCourse.forEach((olCourse, index) => {
        if (olCourse.id === course.id) {
          updatedCourse[index] = {
            ...updatedCourse[index],
            ...course,
          };
        }
      });
      return {
        ...state,
        course,
        courses: updatedCourse,
      };
    }
    case COURSES_ACTIONS.DELETE_COURSE_SUCCESS: {
      const courses = [...state.courses];
      courses.forEach((oldCourse, index) => {
        if (oldCourse.id === id) courses.splice(index, 1);
      });
      return {
        ...state,
        course: {},
        courses,
      };
    }
    case COURSES_ACTIONS.GET_COURSES_ERROR:
    case COURSES_ACTIONS.GET_COURSE_BY_MEMBER_ERROR:
    case COURSES_ACTIONS.GET_COURSE_ERROR:
    case COURSES_ACTIONS.CREATE_COURSE_ERROR:
    case COURSES_ACTIONS.UPDATE_COURSE_ERROR:
    case COURSES_ACTIONS.DELETE_COURSE_ERROR:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};

export {coursesState};
