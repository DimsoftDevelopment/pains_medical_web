import { PATIENTS_ACTIONS, INITIAL_STATE } from './constants'

const patientsState = (state = INITIAL_STATE, action) => {
  const { type, payload } = action || {}
  const { patientsList = [], error, patient = {} } = payload || {}

  switch(type) {
    case PATIENTS_ACTIONS.GET_PATIENTS_LIST:
      return {
        ...state,
        isLoading: true,
        patientsList,
      }
    case PATIENTS_ACTIONS.GET_PATIENTS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patientsList,
      }
    case PATIENTS_ACTIONS.GET_PATIENTS_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error,
      }
      case PATIENTS_ACTIONS.GET_PATIENT:
        return {
          ...state,
          isLoading: true,
          patient,
        }
      case PATIENTS_ACTIONS.GET_PATIENT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          patient,
        }
      case PATIENTS_ACTIONS.GET_PATIENT_ERROR:
        return {
          ...state,
          isLoading: false,
          error,
        }
    default:
      return state
  }
}

export { patientsState }