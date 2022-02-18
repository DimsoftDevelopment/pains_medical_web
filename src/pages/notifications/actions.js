import { NOTIFICATIONS_ACTIONS } from './constants'

export const getNotifications = meta => ({
  type: NOTIFICATIONS_ACTIONS.GET_NOTIFICATIONS,
  payload: { meta }
})

export const getNotificationsSuccess = notifications => ({
  type: NOTIFICATIONS_ACTIONS.GET_NOTIFICATIONS_SUCCESS,
  payload: { notifications }
})

export const getNotificationsFail = error => ({
  type: NOTIFICATIONS_ACTIONS.GET_NOTIFICATIONS_FAIL,
  payload: { error }
})