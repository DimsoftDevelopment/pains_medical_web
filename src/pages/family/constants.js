import KeyMirror from "keymirror";

const FAMILY_ACTIONS = KeyMirror({
  GET_FAMILY_LIST: null,
  GET_FAMILY_LIST_SUCCESS: null,
  GET_FAMILY_LIST_ERROR: null,
  INVITE_MEMBER: null,
  INVITE_MEMBER_SUCCESS: null,
  INVITE_MEMBER_ERROR: null,
});

const INITIAL_STATE = {
  familyList: [],
  error: null,
};

export {FAMILY_ACTIONS, INITIAL_STATE};
