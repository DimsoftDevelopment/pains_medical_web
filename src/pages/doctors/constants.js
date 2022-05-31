import KeyMirror from "keymirror";

const COURSES_ACTIONS = KeyMirror({
  GET_COURSES_DOCTOR: null,
  GET_COURSES_DOCTOR_SUCCESS: null,
  GET_COURSES_DOCTOR_ERROR: null,
  GET_DOCTORS: null,
  GET_DOCTORS_SUCCESS: null,
  GET_DOCTORS_FAIL: null,
  GET_INVITATION: null,
  GET_INVITATION_SUCCESS: null,
  GET_INVITATION_FAIL: null,
  REMOVE_INVITATION: null,
  REMOVE_DOCTOR: null,
  ACCEPT_INVITATION: null,
  REJECT_INVITATION: null
});
const INITIAL_STATE = {
  doctorsList: [],
  invitations: [],
  courses: []
};
const TABS = [{
  name: 'current',
  title: 'Current',
}, {
  name: 'past',
  title: 'Past',
}]

export {COURSES_ACTIONS, INITIAL_STATE, TABS};
