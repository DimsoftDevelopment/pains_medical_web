import {COURSES_ACTIONS, INITIAL_STATE} from './constants';

const doctorsState = (state = INITIAL_STATE, action) => {
  const {type, payload} = action || {};
  const {courses, doctors, invites, error, id} = payload || {};

  switch(type) {
    case COURSES_ACTIONS.REMOVE_INVITATION:
      let arr = state.invitations
      const index = arr.findIndex(item => item.id === id)
      if(index !== -1) arr.splice(index, 1)
      return {
        ...state,
        invitations: [...arr],
      };
    case COURSES_ACTIONS.GET_COURSES_DOCTOR_SUCCESS:
      return {
        ...state,
        courses,
      };
    case COURSES_ACTIONS.GET_DOCTORS_SUCCESS:
      return {
        ...state,
        doctorsList: doctors,
      };
    case COURSES_ACTIONS.GET_INVITATION_SUCCESS:
      return {
        ...state,
        invitations: [...invites]
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

export {doctorsState};
