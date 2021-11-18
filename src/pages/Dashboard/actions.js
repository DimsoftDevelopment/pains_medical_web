import {DASHBOARD_ACTIONS} from './constants';

export const getReceptionMedications = () => ({
  type: DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS,
});

export const getReceptionMedicationsSuccess = ({all_reception_dates, mised_reception_dates}) => ({
  type: DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_SUCCESS,
  payload: {all_reception_dates, mised_reception_dates},
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

export const takeUntakePill = takeUntakePillData => ({
  type: DASHBOARD_ACTIONS.TAKE_UNTAKE_PILL,
  payload: {takeUntakePillData},
});

export const takeUntakePillSuccess = takeUntakePillData => ({
  type: DASHBOARD_ACTIONS.TAKE_UNTAKE_PILL_SUCCESS,
  payload: {takeUntakePillData},
});

export const takeUntakePillError = error => ({
  type: DASHBOARD_ACTIONS.TAKE_UNTAKE_PILL_ERROR,
  payload: {error},
});
