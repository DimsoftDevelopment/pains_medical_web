import {takeEvery, put, call} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import {AUTH_ACTIONS} from './constants';
import {ROUTES} from '../../router/routes';
import {
  sendVerificationCodeSuccess,
  sendVerificationCodeError,
  resendVerificationCodeSuccess,
  resendVerificationCodeError,
  checkVerificationCodeSuccess,
  checkVerificationCodeError,
  sendPinCodeSuccess,
  sendPinCodeError,
  logout,
  logoutSuccess,
  logoutError,
  saveUserInfo,
  signUpSuccess,
  signUpError,
  signIn,
  signInSuccess,
  signInFail
} from './actions';
import {
  togglePinModal,
  toggleNotification,
} from '../pageWrapper/actions';
import {processRequest} from '../../services/Api';
import {
  setToken,
  setRefreshToken,
  setUser,
  getUser,
  getRefreshToken,
  getToken,
  removeRefreshToken,
  removeToken,
  removeUser,
} from '../../services/LocalStorage';

function* handleIsAuthenticated() {
  try {
    const user = getUser();
    const token = getToken();

    if (user && token) {
      if(user.pin_code_present) {
        console.log('SAGA TRUE')
        yield put(togglePinModal());
        yield put(checkVerificationCodeSuccess(user));
        console.log('SAGA: ', user, token)
      } else {
        yield put(signInSuccess(user))
        console.log('SAGA: ', user, token)
      }
    }
  } catch (e) {
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
      yield put(togglePinModal());
    } else if (!data.user && data.message && data.message === 'Phone number is verified') {
      yield put(checkVerificationCodeSuccess());
      yield put(saveUserInfo({phone}));
      yield put(push(ROUTES.PROFILE_CREATION));
    } else {
      yield put(checkVerificationCodeError(data));
    }
  } catch(e) {
    const {data, status, statusText} = e || {};
    const {error_messages, error, error_message} = data || {};

    if (status === 400) {
      let message = '';
      if (error_message) {
        message = error_message;
      } else if (Array.isArray(error_messages)) {
        const keys = Object.keys(error_messages);
        const errorMessage = error_messages[keys[0]];

        message = error_messages && `${keys[0]} ${errorMessage}`;
      } else if (typeof error_messages === 'string') {
        message = error_messages;
      }

      yield put(checkVerificationCodeError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(checkVerificationCodeError(error));
      yield put(logout());
      yield put(togglePinModal());
    } else if (status === 500) {
      yield put(checkVerificationCodeError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(checkVerificationCodeError(e.message));
    } else {
      yield put(checkVerificationCodeError('Internal server error.'));
    }
  }
}

function* handleSendPinCode(action) {
  const {phone, pin_code} = action.payload || {};
  try {
    const refresh_token = getRefreshToken();
    const requestPayload = {phone, pin_code, refresh_token};
    const {data} = yield call(processRequest, '/authorization/check_pin_code', 'POST', requestPayload);
    if (data.user) {
      const user = data.user.data.attributes;
      setUser(user);
      setToken(data.token);
      setRefreshToken(data.refresh_token);
      yield put(sendPinCodeSuccess(user));
      yield put(togglePinModal());
    } else {
      yield put(sendPinCodeError(data));
    }
  } catch(e) {
    const {data, status, statusText} = e || {};
    const {error_messages, error, error_message} = data || {};

    if (status === 400) {
      let message = '';
      if (error_message) {
        message = error_message;
      } else if (Array.isArray(error_messages)) {
        const keys = Object.keys(error_messages);
        const errorMessage = error_messages[keys[0]];

        message = error_messages && `${keys[0]} ${errorMessage}`;
      } else if (typeof error_messages === 'string') {
        message = error_messages;
      }

      yield put(sendPinCodeError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(sendPinCodeError(error));
      yield put(logout());
      yield put(togglePinModal());
    } else if (status === 500) {
      yield put(sendPinCodeError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(sendPinCodeError(e.message));
    } else {
      yield put(sendPinCodeError('Internal server error.'));
    }
  }
}

function* handleSignUp(action) {
  try {
    const {payload} = action || {};
    const {user} = payload || {};
    const formData = new FormData();
    const keys = Object.keys(user);
    keys.forEach(key => {
      if (key === 'avatar' && user[key]) {
        formData.append(`user[${key}]`, user[key]);
      } else {
        formData.append(`user[${key}]`, user[key]);
      }
    });
    const {data} = yield call(processRequest, '/users', 'POST', formData);
    if (data.user) {
      const user = data.user.data.attributes;
      setUser(user);
      setToken(data.token);
      setRefreshToken(data.refresh_token);
      yield put(signUpSuccess(user));
    } else {
      yield put(signUpError(data));
    }
  } catch(e) {
    const {data, status, statusText} = e || {};
    const {error_messages, error, error_message} = data || {};

    if (status === 400) {
      let message = '';
      let isNotifsSent = false
      if (error_message) {
        message = error_message;
      } else if (Array.isArray(error_messages)) {
        const keys = Object.keys(error_messages);
        const errorMessage = error_messages[keys[0]];

        message = error_messages && `${keys[0]} ${errorMessage}`;
      } else if (typeof error_messages === 'string') {
        message = error_messages;
      } else if(typeof error_messages === 'object') {
        for(let i in error_messages) {
          yield put(toggleNotification({
            title: 'Sorry!',
            message: `${i[0].toUpperCase()}${i.substring(1, i.length)} ${error_messages[i]}`,
            type: 'danger',
          }))
        }
        isNotifsSent = true
      }

      yield put(signUpError(message));
      if(!isNotifsSent) yield put(toggleNotification({
        title: 'Sorry!',
        message,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(signUpError(error));
      yield put(logout());
      yield put(togglePinModal());
    } else if (status === 500) {
      yield put(signUpError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(signUpError(e.message));
    } else {
      yield put(signUpError('Internal server error.'));
    }
  }
}

function* handleSignIn(action) {
  const { email, password } = action.payload || {};
  try {
    const requestPayload = { user: { email, password } }
    const {data} = yield call(processRequest, '/authorization/login', 'POST', requestPayload);
    if (data.user) {
      const user = data.user.data.attributes;
      setUser(user);
      setToken(data.token);
      setRefreshToken(data.refresh_token);
      yield put(signInSuccess(user));
    } else {
      yield put(signInFail(data));
    }
  } catch(e) {
    const {data, status, statusText} = e || {};
    const {error_messages, error, error_message} = data || {};

    if (status === 400) {
      let message = '';
      if (error_message) {
        message = error_message;
      } else if (Array.isArray(error_messages)) {
        const keys = Object.keys(error_messages);
        const errorMessage = error_messages[keys[0]];

        message = error_messages && `${keys[0]} ${errorMessage}`;
      } else if (typeof error_messages === 'string') {
        message = error_messages;
      }

      yield put(checkVerificationCodeError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(checkVerificationCodeError(error));
      yield put(logout());
      yield put(togglePinModal());
    } else if (status === 500) {
      yield put(checkVerificationCodeError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(checkVerificationCodeError(e.message));
    } else {
      yield put(checkVerificationCodeError('Internal server error.'));
    }
  }
}

function* hanldeLogout() {
  try {
    removeToken();
    removeRefreshToken();
    removeUser();
    yield put(logoutSuccess());
  } catch(e) {
    yield put(logoutError(e));
  }
}

export function* watchAuthSagas() {
  yield takeEvery(AUTH_ACTIONS.IS_AUTHENTICATED, handleIsAuthenticated);
  yield takeEvery([
    AUTH_ACTIONS.SEND_VERIFICATION_CODE,
    AUTH_ACTIONS.RESEND_VERIFICATION_CODE,
  ], handleSendVerificationCode);
  yield takeEvery(AUTH_ACTIONS.CHECK_VERIFICATION_CODE, handleCheckVerificationCode);
  yield takeEvery(AUTH_ACTIONS.SEND_PIN_CODE, handleSendPinCode);
  yield takeEvery(AUTH_ACTIONS.SIGN_UP, handleSignUp);
  yield takeEvery(AUTH_ACTIONS.LOGOUT, hanldeLogout);
  yield takeEvery(AUTH_ACTIONS.SIGN_IN, handleSignIn);
}
