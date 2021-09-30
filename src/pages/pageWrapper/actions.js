import {PAGE_WRAPPER_ACTIONS} from './constants';

export const togglePinModal = () => ({
  type: PAGE_WRAPPER_ACTIONS.TOGGLE_PIN_MODAL,
});

export const toggleNotification = notification => ({
  type: PAGE_WRAPPER_ACTIONS.TOGGLE_NOTIFICATION,
  payload: {notification},
});

export const togglePinChanged = () => ({
  type: PAGE_WRAPPER_ACTIONS.TOGGLE_PIN_CHANGED_MODAL,
});
