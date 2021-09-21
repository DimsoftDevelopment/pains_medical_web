import KeyMirror from "keymirror";

const AUTH_ACTIONS = KeyMirror({
  IS_AUTHENTICATED: null,
  SEND_VERIFICATION_CODE: null,
  SEND_VERIFICATION_CODE_SUCCESS: null,
  SEND_VERIFICATION_CODE_ERROR: null,
  RESEND_VERIFICATION_CODE: null,
  RESEND_VERIFICATION_CODE_SUCCESS: null,
  RESEND_VERIFICATION_CODE_ERROR: null,
  CHECK_VERIFICATION_CODE: null,
  CHECK_VERIFICATION_CODE_SUCCESS: null,
  CHECK_VERIFICATION_CODE_ERROR: null,
});

const AUTH_STATE = {
  user: null,
  isLoading: false,
  phone: null,
  error: null,
  codeResent: false,
};

export {AUTH_ACTIONS, AUTH_STATE};
