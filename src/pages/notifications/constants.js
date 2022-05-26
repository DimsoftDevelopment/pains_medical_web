import KeyMirror from "keymirror"

const NOTIFICATIONS_ACTIONS = KeyMirror({
  GET_NOTIFICATIONS: null,
  GET_NOTIFICATIONS_SUCCESS: null,
  GET_NOTIFICATIONS_FAIL: null,
  DELETE_NOTIFICATION: null,
  DELETE_NOTIFICATION_SUCCESS: null,
  DELETE_NOTIFICATION_FAIL: null
})
const INITIAL_STATE = {
  notifications: [],
  error: null,
  isLoading: false
}

export {
  NOTIFICATIONS_ACTIONS,
  INITIAL_STATE
}
