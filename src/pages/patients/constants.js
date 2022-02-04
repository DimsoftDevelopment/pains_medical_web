import KeyMirror from "keymirror";

const PATIENTS_ACTIONS = KeyMirror({
  GET_PATIENTS_LIST: null,
  GET_PATIENTS_LIST_SUCCESS: null,
  GET_PATIENTS_LIST_ERROR: null,
  INVITE_MEMBER: null,
  INVITE_MEMBER_SUCCESS: null,
  INVITE_MEMBER_ERROR: null,
  GET_PATIENT: null,
  GET_PATIENT_SUCCESS: null,
  GET_PATIENT_FAIL: null
});

const INITIAL_STATE = {
  patientsList: [],
  isLoading: false,
  error: null,
  patient: {}
};

export {PATIENTS_ACTIONS, INITIAL_STATE};
