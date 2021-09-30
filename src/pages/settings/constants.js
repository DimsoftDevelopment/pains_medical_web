import KeyMirror from "keymirror";

const PROFILE_ACTIONS = KeyMirror({
  UPDATE_PROFILE: null,
  UPDATE_PROFILE_SUCCESS: null,
  UPDATE_PROFILE_ERROR: null,
  CHANGE_AVATAR: null,
  CHANGE_AVATAR_SUCCESS: null,
  CHANGE_AVATAR_ERROR: null,
  DELETE_ACCOUNT: null,
  DELETE_ACCOUNT_SUCCESS: null,
  DELETE_ACCOUNT_ERROR: null,
});
const INITIAL_STATE = {
  error: null,
};

export {PROFILE_ACTIONS, INITIAL_STATE};
