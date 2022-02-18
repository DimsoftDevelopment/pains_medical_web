import {NOTIFICATIONS_ACTIONS, INITIAL_STATE} from './constants'

const notificationsState = (state = INITIAL_STATE, action) => {
  const { type, payload } = action || {}
  const {
    notifications,
    error,
    meta
  } = payload || {}
  switch(type) {
    case NOTIFICATIONS_ACTIONS.GET_NOTIFICATIONS:
      return {
        ...state,
        isLoading: true,
        meta
      }
    case NOTIFICATIONS_ACTIONS.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications,
        isLoading: false
      }
    case NOTIFICATIONS_ACTIONS.GET_NOTIFICATIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error
      }
    default:
      return {
        ...state
      }
  }
}

export { notificationsState }
