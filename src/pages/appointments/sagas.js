import {takeEvery, put, call} from 'redux-saga/effects';
import {APPOINTMENTS_ACTIONS, DASHBOARD_ACTIONS} from './constants';
import {
  getReceptionMedicationsSuccess,
  getReceptionMedicationsError,
  getReceptionMedicationsByUserSuccess,
  getReceptionMedicationsByUserError,
  takeUntakePillSuccess,
  takeUntakePillError,
  getAppointmentsSuccess,
  getAppointmentsFail,
} from './actions';
import {
  togglePinModal,
} from '../pageWrapper/actions';
import {logout} from '../auth/actions';
import {processRequest} from '../../services/Api';
import {getUrl} from '../../services/GetUrl';
import { convertDates } from '../../services/DateHelper';

function* handleGetAppointments(action) {
  try {
    const {payload} = action || {};
    const { start_date } = payload || {};
    const dates = convertDates(start_date);
    const url = getUrl({
      url: '/appointments',
      start_date: dates.start_date,
    });
    const {data} = yield call(processRequest, url, 'GET');
    if (data.appointments) {
      const appointments = data.appointments
      yield put(getAppointmentsSuccess(appointments.data));
    } else {
      yield put(getAppointmentsFail(data));
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

      yield put(getReceptionMedicationsError(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getReceptionMedicationsError(errors));
    } else if (status === 401) {
      yield put(getReceptionMedicationsError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getReceptionMedicationsError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(getReceptionMedicationsError(e.message));
    } else {
      yield put(getReceptionMedicationsError('Internal server error.'));
    }
  }
}

function* handleGetReceptionMedicationsByUser(action) {
  try {
    const {payload} = action || {};
    const {start_date, end_date, selectedUser} = payload || {};
    const dates = convertDates(start_date, end_date);
    const url = getUrl({
      url: '/reception_medications',
      start_date: dates.start_date,
      end_date: dates.end_date,
      user_id: selectedUser,
    });
    const {data} = yield call(processRequest, url, 'GET');
    if (data.courses) {
      const courses = data.courses.data.map(course => course.attributes);
      yield put(getReceptionMedicationsByUserSuccess(courses));
    } else {
      yield put(getReceptionMedicationsByUserError(data));
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

      yield put(getReceptionMedicationsByUserError(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getReceptionMedicationsByUserError(errors));
    } else if (status === 401) {
      yield put(getReceptionMedicationsByUserError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getReceptionMedicationsByUserError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(getReceptionMedicationsByUserError(e.message));
    } else {
      yield put(getReceptionMedicationsByUserError('Internal server error.'));
    }
  }
}

function* handleTakeUntakePill(action) {
  try {
    const {payload} = action || {};
    const {takeUntakePillData} = payload || {};
    const {data} = yield call(processRequest, `/reception_medications/${takeUntakePillData.id}?status=${takeUntakePillData.status}`, 'PUT');
    if (data.message === 'Success') {
      yield put(takeUntakePillSuccess(takeUntakePillData));
    } else {
      yield put(takeUntakePillError(data));
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

      yield put(takeUntakePillError(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(takeUntakePillError(errors));
    } else if (status === 401) {
      yield put(takeUntakePillError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(takeUntakePillError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(takeUntakePillError(e.message));
    } else {
      yield put(takeUntakePillError('Internal server error.'));
    }
  }
}

export function* watchAppointmentsSagas() {
  yield takeEvery(APPOINTMENTS_ACTIONS.GET_APPOINTMENTS, handleGetAppointments);
  
}