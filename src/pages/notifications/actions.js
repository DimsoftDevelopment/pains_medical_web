import { NOTIFICATIONS_ACTIONS } from './constants'

export const getNotifications = (meta) => ({
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

export const deleteNotification = id => ({
  type: NOTIFICATIONS_ACTIONS.DELETE_NOTIFICATION,
  payload: { id }
})

export const deleteNotificationSuccess = id => ({
  type: NOTIFICATIONS_ACTIONS.DELETE_NOTIFICATION_SUCCESS,
  payload: { id }
})

export const deleteNotificationFail = error => ({
  type: NOTIFICATIONS_ACTIONS.DELETE_NOTIFICATION_FAIL,
  payload: { error }
})