import KeyMirror from "keymirror";

const PAGE_WRAPPER_ACTIONS = KeyMirror({
  TOGGLE_PIN_MODAL: null,
  TOGGLE_PIN_CHANGED_MODAL: null,
  TOGGLE_NOTIFICATION: null,
});
const INITIAL_STATE = {
  isPinModalOpen: false,
  isPinChangedOpen: false,
  notification: null,
};

export {PAGE_WRAPPER_ACTIONS, INITIAL_STATE};
