import KeyMirror from "keymirror";

const MEDS_ACTIONS = KeyMirror({
  GET_MEDS: null,
  GET_MEDS_SUCCESS: null,
  GET_MEDS_NEXT_PAGE_SUCCESS: null,
  GET_MEDS_ERROR: null,
  CREATE_MEDICATION: null,
  CREATE_MEDICATION_SUCCESS: null,
  CREATE_MEDICATION_ERROR: null,
  UPDATE_MEDICATION: null,
  UPDATE_MEDICATION_SUCCESS: null,
  UPDATE_MEDICATION_ERROR: null,
  GET_MEDICATION: null,
  GET_MEDICATION_SUCCESS: null,
  GET_MEDICATION_ERROR: null,
  DELETE_MEDICATION: null,
  DELETE_MEDICATION_SUCCESS: null,
  DELETE_MEDICATION_ERROR: null,
});
const INITIAL_STATE = {
  meds: [],
  meta: {
    page: 1,
    per_page: 10,
    query: '',
  },
  medication: {},
  error: null,
};

export {MEDS_ACTIONS, INITIAL_STATE};
