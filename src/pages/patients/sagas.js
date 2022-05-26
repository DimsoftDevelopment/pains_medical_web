import {takeEvery, put, call} from 'redux-saga/effects';
import {PATIENTS_ACTIONS} from './constants';
import {
  getPatientsListSuccess,
  getPatientsListError,
  inviteMemberSuccess,
  inviteMemberError,
  getPatientSuccess,
  getPatientError,
  deletePatientSuccess,
  deletePatientFail,
} from './actions';
import {
  togglePinModal,
  toggleNotification,
} from '../pageWrapper/actions';
import {logout} from '../auth/actions';
import {processRequest} from '../../services/Api';

function* handleGetPatientsList(action) {
  try {
    const {payload} = action || {};
    const {query} = payload || {}
    const {data} = yield call(processRequest, `/doctors/patients${query ? `?query=${query}` : ''}`, 'GET');
    if (data.patients) {
      const patientsList = data.patients.data;
      yield put(getPatientsListSuccess(patientsList));
    } else {
      yield put(getPatientsListError(data));
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

      yield put(getPatientsListError(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getPatientsListError(errors));
    } else if (status === 401) {
      yield put(getPatientsListError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getPatientsListError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(getPatientsListError(e.message));
    } else {
      yield put(getPatientsListError('Internal server error.'));
    }
  }
}


function* handleGetPatient(action) {
  try {
    const { payload } = action || {};
    const { id } = payload || {}
    const { data } = yield call(processRequest, `/users/${id}`, 'GET');
    if (data.user) {
      const user = data.user.data;
      yield put(getPatientSuccess(user));
    } else {
      yield put(getPatientError(data));
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

      yield put(getPatientsListError(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getPatientsListError(errors));
    } else if (status === 401) {
      yield put(getPatientsListError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getPatientsListError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(getPatientsListError(e.message));
    } else {
      yield put(getPatientsListError('Internal server error.'));
    }
  }
}

function* handleInviteMember(action) {
  try {
    const {payload} = action || {};
    const {phone} = payload || {};
    const requestPayload = {phone};
    const {data} = yield call(processRequest, '/doctors/invites', 'POST', requestPayload);
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

function* handleDeleteMember(action) {
  try {
    const {payload} = action || {};
    const {id} = payload || {};
    const {data} = yield call(processRequest, `/doctors/patients/${id}`, 'DELETE');
    if (data.message) {
      yield put(toggleNotification({
        title: 'Success',
        message: data.message,
        type: 'success',
      }));
      yield put(deletePatientSuccess());
    } else {
      yield put(toggleNotification({
        title: 'Error',
        message: 'Something went wrong.',
        type: 'danger',
      }));
      yield put(deletePatientFail());
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

      yield put(deletePatientFail(message));
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
      yield put(deletePatientFail(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(deletePatientFail(statusText || 'Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: statusText || 'Internal server error.',
        type: 'danger',
      }));
    } else if (e.message) {
      yield put(deletePatientFail(e.message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: e.message,
        type: 'danger',
      }));
    } else {
      yield put(deletePatientFail('Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: 'Internal server error.',
        type: 'danger',
      }));
    }
  }
}

export function* watchPatientsSagas() {
  yield takeEvery(PATIENTS_ACTIONS.GET_PATIENTS_LIST, handleGetPatientsList);
  yield takeEvery(PATIENTS_ACTIONS.GET_PATIENT, handleGetPatient);
  yield takeEvery(PATIENTS_ACTIONS.INVITE_MEMBER_DOCTOR, handleInviteMember);
  yield takeEvery(PATIENTS_ACTIONS.DELETE_PATIENT, handleDeleteMember);
}
