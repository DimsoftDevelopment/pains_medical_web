import { PATIENTS_ACTIONS } from './constants'

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
  type: PATIENTS_ACTIONS.INVITE_MEMBER,
  payload: { phone },
})

export const inviteMemberSuccess = () => ({
  type: PATIENTS_ACTIONS.INVITE_MEMBER_SUCCESS,
})

export const inviteMemberError = error => ({
  type: PATIENTS_ACTIONS.INVITE_MEMBER_ERROR,
  payload: { error },
})
