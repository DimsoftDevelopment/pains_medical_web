import {takeEvery, put, call} from 'redux-saga/effects';
import {FAMILY_ACTIONS} from './constants';
import {
  getFamilyListSuccess,
  getFamilyListError,
  inviteMemberSuccess,
  inviteMemberError,
} from './actions';
import {
  togglePinModal,
  toggleNotification,
} from '../pageWrapper/actions';
import {logout} from '../auth/actions';
import {processRequest} from '../../services/Api';

function* handleGetFamilyList() {
  try {
    const {data} = yield call(processRequest, `/family_members/users`, 'GET');
    if (data.users) {
      const familyList = data.users.data.map(item => item.attributes);
      yield put(getFamilyListSuccess(familyList));
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

function* handleInviteMember(action) {
  try {
    const {payload} = action || {};
    const {phone} = payload || {};
    const requestPayload = {phone};
    const {data} = yield call(processRequest, '/family_members/invites', 'POST', requestPayload);
    if (data.message) {
      yield put(toggleNotification({
        title: 'Success',
        message: data.message,
        type: 'success',
      }));
      yield put(inviteMemberSuccess());
    } else {
      yield put(toggleNotification({
        title: 'Error',
        message: 'Something went wrong.',
        type: 'danger',
      }));
      yield put(inviteMemberError());
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

      yield put(inviteMemberError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: message,
        type: 'danger',
      }));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(inviteMemberError(errors));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: errors,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(inviteMemberError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(inviteMemberError(statusText || 'Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: statusText || 'Internal server error.',
        type: 'danger',
      }));
    } else if (e.message) {
      yield put(inviteMemberError(e.message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: e.message,
        type: 'danger',
      }));
    } else {
      yield put(inviteMemberError('Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: 'Internal server error.',
        type: 'danger',
      }));
    }
  }
}

export function* watchFamilySagas() {
  yield takeEvery(FAMILY_ACTIONS.GET_FAMILY_LIST, handleGetFamilyList);
  yield takeEvery(FAMILY_ACTIONS.INVITE_MEMBER, handleInviteMember);
}
