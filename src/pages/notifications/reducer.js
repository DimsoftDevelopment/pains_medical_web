import {NOTIFICATIONS_ACTIONS, INITIAL_STATE} from './constants'

const notificationsState = (state = INITIAL_STATE, action) => {
  const { type, payload } = action || {}
  const {
    notifications,
    error,
    meta,
    id
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
    case NOTIFICATIONS_ACTIONS.DELETE_NOTIFICATION_SUCCESS:
      let arr = [...state.notifications]
      let index = arr.findIndex(item => item.id === id)
      if(index !== -1) arr.splice(index, 1)
      return {
        ...state,
        notifications: [...arr],
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
