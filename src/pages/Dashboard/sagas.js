import {takeEvery, put, call} from 'redux-saga/effects';
import {DASHBOARD_ACTIONS} from './constants';
import {
  getReceptionMedicationsSuccess,
  getReceptionMedicationsError,
  getReceptionMedicationsByUserSuccess,
  getReceptionMedicationsByUserError,
} from './actions';
import {
  togglePinModal,
} from '../pageWrapper/actions';
import {logout} from '../auth/actions';
import {processRequest} from '../../services/Api';
import {getUrl} from '../../services/GetUrl';
import {getCurrentYear, convertDates} from '../../services/DateHelper';

function* handleGetReceptionMedicationsDates() {
  try {
    const {start_date, end_date} = getCurrentYear();
    const url = getUrl({
      url: '/reception_medications/reception_dates',
      start_date,
      end_date,
    });
    const {data} = yield call(processRequest, url, 'GET');
    if (data.all_reception_dates && data.mised_reception_dates) {
      const {all_reception_dates, mised_reception_dates} = data;
      yield put(getReceptionMedicationsSuccess({
        all_reception_dates,
        mised_reception_dates,
      }));
    } else {
      yield put(getReceptionMedicationsError(data));
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

export function* watchDashboardSagas() {
  yield takeEvery(DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS, handleGetReceptionMedicationsDates);
  yield takeEvery(DASHBOARD_ACTIONS.GET_RECEPTION_MEDICATIONS_BY_USER, handleGetReceptionMedicationsByUser);
}
