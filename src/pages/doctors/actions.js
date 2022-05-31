import {COURSES_ACTIONS} from './constants';

export const removeDoctor = id => ({
  type: COURSES_ACTIONS.REMOVE_DOCTOR,
  payload: { id }
})

export const removeInvitation = id => ({
  type: COURSES_ACTIONS.REMOVE_INVITATION,
  payload: { id }
})

export const acceptInvitation = id => ({
  type: COURSES_ACTIONS.ACCEPT_INVITATION,
  payload: { id }
})

export const rejectInvitation = id => ({
  type: COURSES_ACTIONS.REJECT_INVITATION,
  payload: { id }
})

export const getCourses = (id) => ({
  type: COURSES_ACTIONS.GET_COURSES_DOCTOR,
  payload: { user_id: id }
});

export const getCoursesSuccess = courses => ({
  type: COURSES_ACTIONS.GET_COURSES_DOCTOR_SUCCESS,
  payload: {courses},
});

export const getCoursesError = error => ({
  type: COURSES_ACTIONS.GET_COURSES_DOCTOR_ERROR,
  payload: {error},
});

export const getDoctors = () => ({
  type: COURSES_ACTIONS.GET_DOCTORS,
  payload: {  }
})

export const getDoctorsSuccess = doctors => ({
  type: COURSES_ACTIONS.GET_DOCTORS_SUCCESS,
  payload: { doctors }
})

export const getDoctorsFail = err => ({
  type: COURSES_ACTIONS.GET_DOCTORS_FAIL,
  payload: err
})

export const getInvitation = () => ({
  type: COURSES_ACTIONS.GET_INVITATION,
  payload: {  }
})

export const getInvitationSuccess = invites => ({
  type: COURSES_ACTIONS.GET_INVITATION_SUCCESS,
  payload: { invites }
})

export const getInvitationFail = err => ({
  type: COURSES_ACTIONS.GET_INVITATION_FAIL,
  payload: err
})