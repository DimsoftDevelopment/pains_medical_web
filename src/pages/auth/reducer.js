import {AUTH_ACTIONS, AUTH_STATE} from './constants';
import {PROFILE_ACTIONS} from '../settings/constants';

const authState = (state = AUTH_STATE, action) => {
  const {type, payload} = action || {};
  const {user, phone, error} = payload || {};

  switch(type) {
    case AUTH_ACTIONS.SEND_VERIFICATION_CODE:
    case AUTH_ACTIONS.RESEND_VERIFICATION_CODE:
    case AUTH_ACTIONS.CHECK_VERIFICATION_CODE:
    case AUTH_ACTIONS.SEND_PIN_CODE:
    case AUTH_ACTIONS.SIGN_UP:
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
    case PROFILE_ACTIONS.UPDATE_PROFILE_SUCCESS:
    case PROFILE_ACTIONS.CHANGE_AVATAR_SUCCESS:
    case AUTH_ACTIONS.SEND_PIN_CODE_SUCCESS:
    case AUTH_ACTIONS.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        codeResent: false,
        user,
      };
    case AUTH_ACTIONS.SEND_VERIFICATION_CODE_ERROR:
    case AUTH_ACTIONS.RESEND_VERIFICATION_CODE_ERROR:
    case AUTH_ACTIONS.SEND_PIN_CODE_ERROR:
    case AUTH_ACTIONS.SIGN_UP_ERROR:
      return {
        ...state,
        isLoading: false,
        error,
        phone: null,
      };
    case AUTH_ACTIONS.CHECK_VERIFICATION_CODE_ERROR:
      return {
        ...state,
        isLoading: false,
        error,
      };
    case AUTH_ACTIONS.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        codeResent: false,
        isLoading: false,
        phone: null,
      };
    case AUTH_ACTIONS.SAVE_USER_INFO:
      return {
        ...state,
        user,
      };
    default:
      return state;
  }
};

export {authState};
