import {AUTH_ACTIONS, AUTH_STATE} from './constants';

const authState = (state = AUTH_STATE, action) => {
  const {type, payload} = action || {};
  const {user, phone, error} = payload || {};

  switch(type) {
    case AUTH_ACTIONS.SEND_VERIFICATION_CODE:
    case AUTH_ACTIONS.RESEND_VERIFICATION_CODE:
    case AUTH_ACTIONS.CHECK_VERIFICATION_CODE:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_ACTIONS.SEND_VERIFICATION_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        phone,
      };
    case AUTH_ACTIONS.RESEND_VERIFICATION_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        codeResent: true,
      };
    case AUTH_ACTIONS.CHECK_VERIFICATION_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        codeResent: false,
        user,
      };
    case AUTH_ACTIONS.SEND_VERIFICATION_CODE_ERROR:
    case AUTH_ACTIONS.RESEND_VERIFICATION_CODE_ERROR:
    case AUTH_ACTIONS.CHECK_VERIFICATION_CODE_ERROR:
      return {
        ...state,
        isLoading: false,
        error,
        phone: null,
      };
    default:
      return state;
  }
};

export {authState};
