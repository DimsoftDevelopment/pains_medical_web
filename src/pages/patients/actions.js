import { PATIENTS_ACTIONS } from './constants'

export const deletePatient = id => ({
  type: PATIENTS_ACTIONS.DELETE_PATIENT,
  payload: { id }
})
export const deletePatientSuccess = () => ({
  type: PATIENTS_ACTIONS.DELETE_PATIENT_SUCCESS,
  payload: {  }
})
export const deletePatientFail = error => ({
  type: PATIENTS_ACTIONS.DELETE_PATIENT_FAIL,
  payload: { error }
})

export const getPatientsList = query => ({
  type: PATIENTS_ACTIONS.GET_PATIENTS_LIST,
  payload: { query }
})

export const getPatientsListSuccess = patientsList => ({
  type: PATIENTS_ACTIONS.GET_PATIENTS_LIST_SUCCESS,
  payload: { patientsList },
})

export const getPatientsListError = error => ({
  type: PATIENTS_ACTIONS.GET_PATIENTS_LIST_ERROR,
  payload: { error },
})

export const getPatient = id => ({
  type: PATIENTS_ACTIONS.GET_PATIENT,
  payload: { id }
})

export const getPatientSuccess = patient => ({
  type: PATIENTS_ACTIONS.GET_PATIENT_SUCCESS,
  payload: { patient },
})

export const getPatientError = error => ({
  type: PATIENTS_ACTIONS.GET_PATIENT_ERROR,
  payload: { error },
})

export const inviteMember = phone => ({
  type: PATIENTS_ACTIONS.INVITE_MEMBER_DOCTOR,
  payload: { phone },
})

export const inviteMemberSuccess = () => ({
  type: PATIENTS_ACTIONS.INVITE_MEMBER_DOCTOR_SUCCESS,
})

export const inviteMemberError = error => ({
  type: PATIENTS_ACTIONS.INVITE_MEMBER_DOCTOR_ERROR,
  payload: { error },
})
