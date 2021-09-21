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
import {setToken, setRefreshToken, setUser, getUser, getToken} from '../../services/LocalStorage';

function* handleIsAuthenticated() {
  try {
    const user = getUser();
    const token = getToken();
    // if(token) {
    //   yield put(profileActions.getCurrentUser());
    // }

    if (user && token) {
      yield put(checkVerificationCodeSuccess(user));
    }
  } catch (e) {
    console.log(e);
    const {data, status, statusText} = e || {};
    const {error_messages, error, error_message} = data || {};

    if (status === 400) {
      let message = '';
      if (error_message) {
        message = error_message;
      } else if (error_messages) {
        const keys = Object.keys(error_messages);
        const errorMessage = error_messages[keys[0]];

        message = error_messages && `${keys[0]} ${errorMessage}`;
      }

      yield put(checkVerificationCodeError(message));
    } else if (status === 401) {
      yield put(checkVerificationCodeError(error));
    } else if (status === 500) {
      yield put(checkVerificationCodeError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(checkVerificationCodeError(e.message));
    } else {
      yield put(checkVerificationCodeError('Internal server error.'));
    }
  }
}

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
  yield takeEvery(AUTH_ACTIONS.IS_AUTHENTICATED, handleIsAuthenticated);
  yield takeEvery([
    AUTH_ACTIONS.SEND_VERIFICATION_CODE,
    AUTH_ACTIONS.RESEND_VERIFICATION_CODE,
  ], handleSendVerificationCode);
  yield takeEvery(AUTH_ACTIONS.CHECK_VERIFICATION_CODE, handleCheckVerificationCode);
}
