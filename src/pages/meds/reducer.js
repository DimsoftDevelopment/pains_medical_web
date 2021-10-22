import {MEDS_ACTIONS, INITIAL_STATE} from './constants';

const medsState = (state = INITIAL_STATE, action) => {
  const {type, payload} = action || {};
  const {meds, medication, meta, id, error} = payload || {};

  switch(type) {
    case MEDS_ACTIONS.GET_MEDS:
      return {
        ...state,
        meta,
      };
    case MEDS_ACTIONS.GET_MEDS_SUCCESS:
      return {
        ...state,
        meds,
      };
    case MEDS_ACTIONS.GET_MEDS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        meds: [...state.meds, ...meds],
      };
    case MEDS_ACTIONS.GET_MEDICATION_SUCCESS:
      return {
        ...state,
        medication,
      };
    case MEDS_ACTIONS.CREATE_MEDICATION_SUCCESS:
      return {
        ...state,
        medication,
        meds: [...state.meds, ...[medication]],
      };
    case MEDS_ACTIONS.UPDATE_MEDICATION_SUCCESS: {
      const updatedMeds = [...state.meds];
      updatedMeds.forEach((med, index) => {
        if (med.id === medication.id) {
          updatedMeds[index] = {
            ...updatedMeds[index],
            ...medication,
          };
        }
      });
      return {
        ...state,
        medication,
        meds: updatedMeds,
      };
    }
    case MEDS_ACTIONS.DELETE_MEDICATION_SUCCESS: {
      const medications = [...state.meds];
      medications.forEach((med, index) => {
        if (med.id === id) medications.splice(index, 1);
      });
      return {
        ...state,
        medication: {},
        meds: medications,
      };
    }
    case MEDS_ACTIONS.SAVE_MEDICATION_TITLE:
      return {
        ...state,
        medication,
      };
    case MEDS_ACTIONS.GET_MEDS_ERROR:
    case MEDS_ACTIONS.GET_MEDICATION_ERROR:
    case MEDS_ACTIONS.CREATE_MEDICATION_ERROR:
    case MEDS_ACTIONS.UPDATE_MEDICATION_ERROR:
    case MEDS_ACTIONS.DELETE_MEDICATION_ERROR:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};

export {medsState};
