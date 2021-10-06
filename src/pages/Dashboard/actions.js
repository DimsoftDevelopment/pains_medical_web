import {DASHBOARD_ACTIONS} from './constants';

export const getReceptionMedications = (start_date, end_date) => ({
  type: DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS,
  payload: {start_date, end_date},
});

export const getReceptionMedicationsSuccess = receptionMedications => ({
  type: DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_SUCCESS,
  payload: {receptionMedications},
});

export const getReceptionMedicationsError = error => ({
  type: DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_ERROR,
  payload: {error},
});

export const getReceptionMedicationsByUser = (start_date, end_date, selectedUser) => ({
  type: DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_BY_USER,
  payload: {start_date, end_date, selectedUser},
});

export const getReceptionMedicationsByUserSuccess = receptionMedications => ({
  type: DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_BY_USER_SUCCESS,
  payload: {receptionMedications},
});

export const getReceptionMedicationsByUserError = error => ({
  type: DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_BY_USER_ERROR,
  payload: {error},
});
