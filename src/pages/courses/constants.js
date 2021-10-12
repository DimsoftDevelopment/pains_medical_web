import KeyMirror from "keymirror";

const COURSES_ACTIONS = KeyMirror({
  GET_COURSES: null,
  GET_COURSES_SUCCESS: null,
  GET_COURSES_ERROR: null,
  GET_COURSE_BY_MEMBER: null,
  GET_COURSE_BY_MEMBER_SUCCESS: null,
  GET_COURSE_BY_MEMBER_ERROR: null,
  GET_COURSE: null,
  GET_COURSE_SUCCESS: null,
  GET_COURSE_ERROR: null,
  CREATE_COURSE: null,
  CREATE_COURSE_SUCCESS: null,
  CREATE_COURSE_ERROR: null,
  UPDATE_COURSE: null,
  UPDATE_COURSE_SUCCESS: null,
  UPDATE_COURSE_ERROR: null,
  DELETE_COURSE: null,
  DELETE_COURSE_SUCCESS: null,
  DELETE_COURSE_ERROR: null,
});
const INITIAL_STATE = {
  courses: [],
  course: {},
  error: null,
};

export {COURSES_ACTIONS, INITIAL_STATE};
