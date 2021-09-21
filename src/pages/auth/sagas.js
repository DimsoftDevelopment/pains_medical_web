import {takeEvery, put, call} from 'redux-saga/effects';
import {AUTH_ACTIONS} from './constants';
import {
  sendVerificationCodeSuccess,
  sendVerificationCodeError,
  resendVerificationCodeSuccess,
  resendVerificationCodeError,
  checkVerificationCodeSuccess,
  checkVerificationCodeError,
} from './actions';
import {processRequest} from '../../services/Api';
import {setToken, setRefreshToken, setUser} from '../../services/LocalStorage';

function* handleSendVerificationCode(action) {
  const {phone, isResend} = action.payload || {};
  try {
    const requestPayload = {
      phone_verification: {phone},
    };
    const {data} = yield call(processRequest, '/phone_verifications', 'POST', requestPayload);
    if (data.message) {
      if (isResend) {
        yield put(resendVerificationCodeSuccess(phone));
      } else {
        yield put(sendVerificationCodeSuccess(phone));
      }
    } else {
      if (isResend) {
        yield put(resendVerificationCodeError(data));
      } else {
        yield put(sendVerificationCodeError(data));
      }
    }
  } catch(e) {
    const sendError = isResend ? resendVerificationCodeError : sendVerificationCodeError;
    console.log(e);
    yield put(sendError(e));
  }
}

function* handleCheckVerificationCode(action) {
  const {phone, code} = action.payload || {};
  try {
    const requestPayload = {phone, code};
    const {data} = yield call(processRequest, '/phone_verifications/check_code', 'POST', requestPayload);
    if (data.user) {
      const user = data.user.data.attributes;
      setUser(user);
      setToken(data.token);
      setRefreshToken(data.refresh_token);
      yield put(checkVerificationCodeSuccess(user));
    } else if (!data.user && data.token) {
      setToken(data.token);
      setRefreshToken(data.refresh_token);
      yield put(checkVerificationCodeSuccess({}));
    } else {
      yield put(checkVerificationCodeError(data));
    }
  } catch(e) {
    console.log(e);
    yield put(checkVerificationCodeError(e));
  }
}

export function* watchAuthSagas() {
  yield takeEvery([
    AUTH_ACTIONS.SEND_VERIFICATION_CODE,
    AUTH_ACTIONS.RESEND_VERIFICATION_CODE,
  ], handleSendVerificationCode);
  yield takeEvery(AUTH_ACTIONS.CHECK_VERIFICATION_CODE, handleCheckVerificationCode);
}
