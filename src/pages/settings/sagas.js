import {takeEvery, put, call} from 'redux-saga/effects';
import {PROFILE_ACTIONS} from './constants';
import {
  updateProfileSuccess,
  updateProfileError,
  deleteAccountSuccess,
  deleteAccountError,
  changeAvatarSuccess,
  changeAvatarError,
  changePassSuccess,
  changePassError,
} from './actions';
import {
  togglePinModal,
  toggleNotification,
  togglePinChanged,
} from '../pageWrapper/actions';
import {logout} from '../auth/actions';
import {processRequest} from '../../services/Api';
import {setToken, setUser} from '../../services/LocalStorage';

function* handleUpdateProfile(action) {
  try {
    const {payload} = action || {};
    const {user} = payload || {};
    const {data} = yield call(processRequest, `/users/${user.id}`, 'PUT', user);
    if (data.user) {
      const updatedUser = data.user.data.attributes;
      setUser(updatedUser);
      setToken(data.token);
      yield put(updateProfileSuccess(updatedUser));
      if (user.change_pin) {
        yield put(togglePinChanged());
      } else {
        yield put(toggleNotification({
          title: 'Success',
          message: 'Profile updated.',
          type: 'success',
        }));
      }
    } else {
      yield put(updateProfileError(data));
    }
  } catch(e) {
    const {data, status, statusText} = e || {};
    const {error_messages, error, error_message, errors} = data || {};

    if (status === 400) {
      let message = '';
      if (error_message) {
        message = error_message;
      } else if (error_messages) {
        const keys = Object.keys(error_messages);
        const errorMessage = error_messages[keys[0]];

        message = error_messages && `${keys[0]} ${errorMessage}`;
      }

      yield put(updateProfileError(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(updateProfileError(errors));
    } else if (status === 401) {
      yield put(updateProfileError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(updateProfileError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(updateProfileError(e.message));
    } else {
      yield put(updateProfileError('Internal server error.'));
    }
  }
}

function* handleChangePass(action) {
  try {
    const { payload } = action
    console.log(payload)
    const {data} = yield call(processRequest, `/doctors/passwords/change`, 'PUT', payload);
    if (data.refresh_token) {
      setToken(data.token);
      yield put(changePassSuccess())
      yield put(toggleNotification({
        title: 'Success',
        message: 'Password changed.',
        type: 'success',
      }));
    } else {
      yield put(changePassError(data.message));
      yield put(toggleNotification({
        title: 'Error',
        message: data.message,
        type: 'danger',
      }));
    }
  } catch(e) {
    const {data, status, statusText} = e || {};
    const {error_messages, error, error_message, errors, message} = data || {};
    if (status === 400) {
      let e = '';
      if (error_message) {
        e = error_message;
      } else if (message) e = message
      else if (error_messages) {
        const keys = Object.keys(error_messages);
        const errorMessage = error_messages[keys[0]];

        e = error_messages && `${errorMessage}`;
      }
      yield put(toggleNotification({
        title: 'Error',
        message: e,
        type: 'danger',
      }));
      yield put(changePassError(e));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(changePassError(errors));
    } else if (status === 401) {
      yield put(changePassError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(changePassError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(changePassError(e.message));
    } else {
      yield put(changePassError('Internal server error.'));
    }
  }
}

function* handleChangeAvatar(action) {
  try {
    const {payload} = action || {};
    const {user} = payload || {};
    const formData = new FormData();
    if (user.avatar) {
      formData.append('user[avatar]', user.avatar);
    } else {
      formData.append('delete_avatar', true);
    }
    const {data} = yield call(processRequest, `/users/${user.id}`, 'PUT', formData);
    if (data.user) {
      const updatedUser = data.user.data.attributes;
      setUser(updatedUser);
      setToken(data.token);
      yield put(changeAvatarSuccess(updatedUser));
      if (user.change_pin) {
        yield put(togglePinChanged());
      } else {
        yield put(toggleNotification({
          title: 'Success',
          message: 'Profile updated.',
          type: 'success',
        }));
      }
    } else {
      yield put(changeAvatarError(data));
    }
  } catch(e) {
    const {data, status, statusText} = e || {};
    const {error_messages, error, error_message, errors} = data || {};

    if (status === 400) {
      let message = '';
      if (error_message) {
        message = error_message;
      } else if (error_messages) {
        const keys = Object.keys(error_messages);
        const errorMessage = error_messages[keys[0]];

        message = error_messages && `${keys[0]} ${errorMessage}`;
      }

      yield put(changeAvatarError(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(changeAvatarError(errors));
    } else if (status === 401) {
      yield put(changeAvatarError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(changeAvatarError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(changeAvatarError(e.message));
    } else {
      yield put(changeAvatarError('Internal server error.'));
    }
  }
}

function* handleDeleteAccount (action) {
  try {
    const {payload} = action || {};
    const {user_id} = payload || {};
    const {data} = yield call(processRequest, `/users/${user_id}`, 'DELETE');

    if (data.message && data.message === 'Your profile deleted') {
      yield put(deleteAccountSuccess());
      yield put(logout());
    } else {
      yield put(deleteAccountError(data));
    }
  } catch(e) {
    const {data, status, statusText} = e || {};
    const {error_messages, error, error_message, errors} = data || {};

    if (status === 400) {
      let message = '';
      if (error_message) {
        message = error_message;
      } else if (error_messages) {
        const keys = Object.keys(error_messages);
        const errorMessage = error_messages[keys[0]];

        message = error_messages && `${keys[0]} ${errorMessage}`;
      }

      yield put(deleteAccountError(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(deleteAccountError(errors));
    } else if (status === 401) {
      yield put(deleteAccountError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(deleteAccountError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(deleteAccountError(e.message));
    } else {
      yield put(deleteAccountError('Internal server error.'));
    }
  }
}

export function* watchProfileSagas() {
  yield takeEvery(PROFILE_ACTIONS.UPDATE_PROFILE, handleUpdateProfile);
  yield takeEvery(PROFILE_ACTIONS.CHANGE_AVATAR, handleChangeAvatar);
  yield takeEvery(PROFILE_ACTIONS.DELETE_ACCOUNT, handleDeleteAccount);
  yield takeEvery(PROFILE_ACTIONS.CHANGE_PASS, handleChangePass);
}
