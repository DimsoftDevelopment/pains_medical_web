import KeyMirror from "keymirror";

const MEDS_ACTIONS = KeyMirror({
  GET_MEDS: null,
  GET_MEDS_SUCCESS: null,
  GET_MEDS_ERROR: null,
});
const INITIAL_STATE = {
  meds: [],
  error: null,
};

export {MEDS_ACTIONS, INITIAL_STATE};
