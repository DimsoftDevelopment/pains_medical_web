import {AUTH_ACTIONS} from './constants';

export const sendVerificationCode = phone => ({
  type: AUTH_ACTIONS.SEND_VERIFICATION_CODE,
  payload: {phone},
});

export const sendVerificationCodeSuccess = () => ({
  type: AUTH_ACTIONS.SEND_VERIFICATION_CODE_SUCCESS,
});

export const sendVerificationCodeError = error => ({
  type: AUTH_ACTIONS.SEND_VERIFICATION_CODE_ERROR,
  payload: {error},
});

export const resendVerificationCode = phone => ({
  type: AUTH_ACTIONS.RESEND_VERIFICATION_CODE,
  payload: {phone, isResend: true},
});

export const resendVerificationCodeSuccess = () => ({
  type: AUTH_ACTIONS.RESEND_VERIFICATION_CODE_SUCCESS,
});

export const resendVerificationCodeError = error => ({
  type: AUTH_ACTIONS.RESEND_VERIFICATION_CODE_ERROR,
  payload: {error},
});

export const checkVerificationCode = (phone, code) => ({
  type: AUTH_ACTIONS.CHECK_VERIFICATION_CODE,
  payload: {phone, code},
});

export const checkVerificationCodeSuccess = () => ({
  type: AUTH_ACTIONS.CHECK_VERIFICATION_CODE_SUCCESS,
});

export const checkVerificationCodeError = error => ({
  type: AUTH_ACTIONS.CHECK_VERIFICATION_CODE_ERROR,
  payload: {error},
});
