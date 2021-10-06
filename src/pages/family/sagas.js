import {takeEvery, put, call} from 'redux-saga/effects';
import {FAMILY_ACTIONS} from './constants';
import {
  getFamilyListSuccess,
  getFamilyListError,
} from './actions';
import {
  togglePinModal,
  // toggleNotification,
} from '../pageWrapper/actions';
import {logout} from '../auth/actions';
import {processRequest} from '../../services/Api';

function* handleGetFamilyList() {
  try {
    const {data} = yield call(processRequest, `/family_members/users`, 'GET');
    if (data.users) {
      const updatedUser = data;
      yield put(getFamilyListSuccess(data.users));
    } else {
      yield put(getFamilyListError(data));
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

      yield put(getFamilyListError(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getFamilyListError(errors));
    } else if (status === 401) {
      yield put(getFamilyListError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getFamilyListError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(getFamilyListError(e.message));
    } else {
      yield put(getFamilyListError('Internal server error.'));
    }
  }
}

export function* watchFamilySagas() {
  yield takeEvery(FAMILY_ACTIONS.GET_FAMILY_LIST, handleGetFamilyList);
}
