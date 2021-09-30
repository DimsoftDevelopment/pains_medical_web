import {PAGE_WRAPPER_ACTIONS, INITIAL_STATE} from './constants';

const pageWrapperState = (state = INITIAL_STATE, action) => {
  const {type, payload} = action || {};
  const {notification} = payload || {};

  switch(type) {
    case PAGE_WRAPPER_ACTIONS.TOGGLE_PIN_MODAL:
      return {
        ...state,
        isPinModalOpen: !state.isPinModalOpen,
      };
    case PAGE_WRAPPER_ACTIONS.TOGGLE_NOTIFICATION:
      return {
        ...state,
        notification,
      };
    case PAGE_WRAPPER_ACTIONS.TOGGLE_PIN_CHANGED_MODAL:
      return {
        ...state,
        isPinChangedOpen: !state.isPinChangedOpen,
      };
    default:
      return state;
  }
};

export {pageWrapperState};
