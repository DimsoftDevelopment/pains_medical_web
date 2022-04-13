import { takeEvery, put, call } from 'redux-saga/effects';
import { APPOINTMENTS_ACTIONS } from './constants';
import {
  getAppointmentsSuccess,
  getAppointmentsFail,
  addAppointmentSuccess,
  addAppointmentFail,
  getAppointments
} from './actions';
import {
  toggleNotification,
  togglePinModal,
} from '../pageWrapper/actions';
import {logout} from '../auth/actions';
import {processRequest} from '../../services/Api';
import {getUrl} from '../../services/GetUrl';
import { convertDates } from '../../services/DateHelper';
import { push } from 'connected-react-router';
import { ROUTES } from '../../router/routes';

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

    }

    //   yield put(getReceptionMedicationsError(message));
    // } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
    //   yield put(togglePinModal());
    //   yield put(getReceptionMedicationsError(errors));
    // } else if (status === 401) {
    //   yield put(getReceptionMedicationsError(error));
    //   yield put(logout());
    // } else if (status === 500) {
    //   yield put(getReceptionMedicationsError(statusText || 'Internal server error.'));
    // } else if (e.message) {
    //   yield put(getReceptionMedicationsError(e.message));
    // } else {
    //   yield put(getReceptionMedicationsError('Internal server error.'));
    // }
  }
}

function* handleCreateAppointment(action) {
  try {
    const {payload} = action || {};
    const { start_date, user_id, place, end } = payload || {}
    const appointment = {
      appointment: {
        start_date,
        user_id,
        place
      }
    }
    const {data} = yield call(processRequest, '/appointments', 'POST', appointment)
    console.log('RESPONSE: ', data)
    if (data.appointment) {
      end()
      yield put(addAppointmentSuccess(data.appointment))
      yield put(getAppointments(start_date))
      yield put(toggleNotification({
        title: 'Success!'
      }))
    } else {
      yield put(addAppointmentFail(data));
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
    }
    //   yield put(getReceptionMedicationsError(message));
    // } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
    //   yield put(togglePinModal());
    //   yield put(getReceptionMedicationsError(errors));
    // } else if (status === 401) {
    //   yield put(getReceptionMedicationsError(error));
    //   yield put(logout());
    // } else if (status === 500) {
    //   yield put(getReceptionMedicationsError(statusText || 'Internal server error.'));
    // } else if (e.message) {
    //   yield put(getReceptionMedicationsError(e.message));
    // } else {
    //   yield put(getReceptionMedicationsError('Internal server error.'));
    // }
  }
}

export function* watchAppointmentsSagas() {
  yield takeEvery(APPOINTMENTS_ACTIONS.GET_APPOINTMENTS, handleGetAppointments)
  yield takeEvery(APPOINTMENTS_ACTIONS.CREATE_APPOINTMENT, handleCreateAppointment)  
}