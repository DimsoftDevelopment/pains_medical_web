import {AUTH_ACTIONS} from './constants';

export const isAuthenticated = () => ({
  type: AUTH_ACTIONS.IS_AUTHENTICATED,
});

export const sendVerificationCode = phone => ({
  type: AUTH_ACTIONS.SEND_VERIFICATION_CODE,
  payload: {phone},
});

export const sendVerificationCodeSuccess = phone => ({
  type: AUTH_ACTIONS.SEND_VERIFICATION_CODE_SUCCESS,
  payload: {phone},
});

export const sendVerificationCodeError = error => ({
  type: AUTH_ACTIONS.SEND_VERIFICATION_CODE_ERROR,
  payload: {error},
});

export const resendVerificationCode = phone => ({
  type: AUTH_ACTIONS.RESEND_VERIFICATION_CODE,
  payload: {phone, isResend: true},
});

export const resendVerificationCodeSuccess = phone => ({
  type: AUTH_ACTIONS.RESEND_VERIFICATION_CODE_SUCCESS,
  payload: {phone},
});

export const resendVerificationCodeError = error => ({
  type: AUTH_ACTIONS.RESEND_VERIFICATION_CODE_ERROR,
  payload: {error},
});

export const checkVerificationCode = (phone, code) => ({
  type: AUTH_ACTIONS.CHECK_VERIFICATION_CODE,
  payload: {phone, code},
});

export const checkVerificationCodeSuccess = user => ({
  type: AUTH_ACTIONS.CHECK_VERIFICATION_CODE_SUCCESS,
  payload: {user},
});

export const checkVerificationCodeError = error => ({
  type: AUTH_ACTIONS.CHECK_VERIFICATION_CODE_ERROR,
  payload: {error},
});

export const logout = () => ({
  type: AUTH_ACTIONS.LOGOUT,
});

export const logoutSuccess = () => ({
  type: AUTH_ACTIONS.LOGOUT_SUCCESS,
});

export const logoutError = error => ({
  type: AUTH_ACTIONS.LOGOUT_ERROR,
  payload: {error},
});

export const sendPinCode = (phone, pin_code) => ({
  type: AUTH_ACTIONS.SEND_PIN_CODE,
  payload: {phone, pin_code},
});

export const sendPinCodeSuccess = user => ({
  type: AUTH_ACTIONS.SEND_PIN_CODE_SUCCESS,
  payload: {user},
});

export const sendPinCodeError = error => ({
  type: AUTH_ACTIONS.SEND_PIN_CODE_ERROR,
  payload: {error},
});

export const saveUserInfo = user => ({
  type: AUTH_ACTIONS.SAVE_USER_INFO,
  payload: {user},
});

export const signUp = user => ({
  type: AUTH_ACTIONS.SIGN_UP,
  payload: {user},
});

export const signUpSuccess = user => ({
  type: AUTH_ACTIONS.SIGN_UP_SUCCESS,
  payload: {user},
});

export const signUpError = error => ({
  type: AUTH_ACTIONS.SIGN_UP_ERROR,
  payload: {error},
});
