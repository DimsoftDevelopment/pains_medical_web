import {MEDS_ACTIONS} from './constants';

export const getMeds = meta => ({
  type: MEDS_ACTIONS.GET_MEDS,
  payload: {meta},
});

export const getMedsSuccess = meds => ({
  type: MEDS_ACTIONS.GET_MEDS_SUCCESS,
  payload: {meds},
});

export const getMedsNextPageSuccess = meds => ({
  type: MEDS_ACTIONS.GET_MEDS_NEXT_PAGE_SUCCESS,
  payload: {meds},
});

export const getMedsError = error => ({
  type: MEDS_ACTIONS.GET_MEDS_ERROR,
  payload: {error},
});

export const getMedication = id => ({
  type: MEDS_ACTIONS.GET_MEDICATION,
  payload: {id},
});

export const getMedicationSuccess = medication => ({
  type: MEDS_ACTIONS.GET_MEDICATION_SUCCESS,
  payload: {medication},
});

export const getMedicationError = error => ({
  type: MEDS_ACTIONS.GET_MEDICATION_ERROR,
  payload: {error},
});

export const createMedication = medication => ({
  type: MEDS_ACTIONS.CREATE_MEDICATION,
  payload: {medication},
});

export const createMedicationSuccess = medication => ({
  type: MEDS_ACTIONS.CREATE_MEDICATION_SUCCESS,
  payload: {medication},
});

export const createMedicationError = error => ({
  type: MEDS_ACTIONS.CREATE_MEDICATION_ERROR,
  payload: {error},
});

export const updateMedication = medication => ({
  type: MEDS_ACTIONS.UPDATE_MEDICATION,
  payload: {medication},
});

export const updateMedicationSuccess = medication => ({
  type: MEDS_ACTIONS.UPDATE_MEDICATION_SUCCESS,
  payload: {medication},
});

export const updateMedicationError = error => ({
  type: MEDS_ACTIONS.UPDATE_MEDICATION_ERROR,
  payload: {error},
});

export const deleteMedication = id => ({
  type: MEDS_ACTIONS.DELETE_MEDICATION,
  payload: {id},
});

export const deleteMedicationSuccess = id => ({
  type: MEDS_ACTIONS.DELETE_MEDICATION_SUCCESS,
  payload: {id},
});

export const deleteMedicationError = error => ({
  type: MEDS_ACTIONS.DELETE_MEDICATION_ERROR,
  payload: {error},
});
