import KeyMirror from "keymirror";

const COURSES_ACTIONS = KeyMirror({
  GET_COURSES: null,
  GET_COURSES_SUCCESS: null,
  GET_COURSES_ERROR: null,
});
const INITIAL_STATE = {
  courses: [],
  error: null,
};

export {COURSES_ACTIONS, INITIAL_STATE};
