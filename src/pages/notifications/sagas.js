import { takeEvery, put, call } from 'redux-saga/effects';
import { NOTIFICATIONS_ACTIONS } from './constants';
import {
  getNotificationsSuccess,
  getNotificationsFail
} from './actions';
import {processRequest} from '../../services/Api';
import {getUrl} from '../../services/GetUrl';

function* handleGetNotifications(action) {
  try {
    const { payload } = action || {};
    const { meta } = payload || {};
    let query = []
    for(let i in meta) {
      query.push(`${i}=${meta[i]}`)
    }
    const url = getUrl({
      url: `/doctors/feeds?${query.join('&')}`,
    });
    const {data} = yield call(processRequest, url, 'GET');
    if (data.feeds) {
      const notifications = data.feeds
      yield put(getNotificationsSuccess(notifications.data));
    } else {
      yield put(getNotificationsFail(data));
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

export function* watchNotificationsSagas() {
  yield takeEvery(NOTIFICATIONS_ACTIONS.GET_NOTIFICATIONS, handleGetNotifications)
}