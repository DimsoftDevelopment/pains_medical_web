import {APPOINTMENTS_ACTIONS} from './constants'

export const getAppointments = start_date => ({
  type: APPOINTMENTS_ACTIONS.GET_APPOINTMENTS,
  payload: { start_date }
})

export const getAppointmentsSuccess = appointments => ({
  type: APPOINTMENTS_ACTIONS.GET_APPOINTMENTS_SUCCESS,
  payload: { appointments }
})

export const getAppointmentsFail = error => ({
  type: APPOINTMENTS_ACTIONS.GET_APPOINTMENTS_FAIL,
  payload: { error }
})

export const addAppointment = ({ place, start_date, user_id, end }) => ({
  type: APPOINTMENTS_ACTIONS.CREATE_APPOINTMENT,
  payload: { place, start_date, user_id, end }
})

export const addAppointmentSuccess = ({ place, start_date, user_id }) => ({
  type: APPOINTMENTS_ACTIONS.CREATE_APPOINTMENT_SUCCESS,
  payload: { place, start_date, user_id }
})

export const addAppointmentFail = ({ place, start_date, user_id }) => ({
  type: APPOINTMENTS_ACTIONS.CREATE_APPOINTMENT_FAIL,
  payload: { place, start_date, user_id }
})