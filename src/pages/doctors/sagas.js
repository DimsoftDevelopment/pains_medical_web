import {takeEvery, put, call} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import {COURSES_ACTIONS} from './constants';
import {
  getCoursesSuccess,
  getCoursesError,
  getDoctorsFail,
  getDoctorsSuccess,
  getInvitationSuccess,
  getInvitationFail,
  removeInvitation,
  getDoctors
} from './actions';
import {
  togglePinModal,
  toggleNotification,
} from '../pageWrapper/actions';
import {logout} from '../auth/actions';
import {processRequest} from '../../services/Api';
import { ROUTES } from '../../router/routes';

function* handleGetCourses(action) {
  try {
    const { payload } = action || {}
    const { user_id } = payload || {}
    const {data} = yield call(processRequest, `/courses${user_id ? `?doctor_id=${user_id}` : ''}`, 'GET');
    if (data.courses) {
      const courses = data.courses.data.map(course => course.attributes);
      yield put(getCoursesSuccess(courses));
    } else {
      yield put(getCoursesError(data));
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

      yield put(getCoursesError(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getCoursesError(errors));
    } else if (status === 401) {
      yield put(getCoursesError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getCoursesError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(getCoursesError(e.message));
    } else {
      yield put(getCoursesError('Internal server error.'));
    }
  }
}

function* handleGetDoctors(action) {
  try {
    const { payload } = action || {}
    const {data} = yield call(processRequest, `/doctors`, 'GET');
    if (data.doctors) {
      const doctors = data.doctors.data.map(item => item.attributes);
      yield put(getDoctorsSuccess(doctors));
    } else {
      yield put(getDoctorsFail(data));
    }
  } catch(e) {
    console.log(e)
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

      yield put(getDoctorsFail(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getDoctorsFail(errors));
    } else if (status === 401) {
      yield put(getDoctorsFail(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getDoctorsFail(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(getDoctorsFail(e.message));
    } else {
      yield put(getDoctorsFail('Internal server error.'));
    }
  }
}

function* handleGetInvitation(action) {
  try {
    const { payload } = action || {}
    const {data} = yield call(processRequest, `/doctors/invites`, 'GET');
    if (data.invites) {
      const invites = data.invites.data.map(item => item.attributes);
      yield put(getInvitationSuccess(invites));
    } else {
      yield put(getInvitationFail(data));
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

      yield put(getInvitationFail(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getInvitationFail(errors));
    } else if (status === 401) {
      yield put(getInvitationFail(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getInvitationFail(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(getInvitationFail(e.message));
    } else {
      yield put(getInvitationFail('Internal server error.'));
    }
  }
}

function* handleAcceptInvitation(action) {
  try {
    const { payload } = action || {}
    const { id } = payload || {}
    const {data} = yield call(processRequest, `/doctors/invites/${id}`, 'PUT')
    yield put(removeInvitation(id))
    yield put(getDoctors())
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

      yield put(getInvitationFail(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getInvitationFail(errors));
    } else if (status === 401) {
      yield put(getInvitationFail(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getInvitationFail(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(getInvitationFail(e.message));
    } else {
      yield put(getInvitationFail('Internal server error.'));
    }
  }
}

function* handleRejectInvitation(action) {
  try {
    const { payload } = action || {}
    const { id } = payload || {}
    const {data} = yield call(processRequest, `/doctors/invites/${id}`, 'DELETE')
    yield put(removeInvitation(id))
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

      yield put(getInvitationFail(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getInvitationFail(errors));
    } else if (status === 401) {
      yield put(getInvitationFail(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getInvitationFail(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(getInvitationFail(e.message));
    } else {
      yield put(getInvitationFail('Internal server error.'));
    }
  }
}

function* handleRemoveDoctor(action) {
  try {
    const { payload } = action || {}
    const { id } = payload || {}
    const {data} = yield call(processRequest, `/doctors/${id}`, 'DELETE')
    yield put(getDoctors())
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

      yield put(getInvitationFail(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getInvitationFail(errors));
    } else if (status === 401) {
      yield put(getInvitationFail(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getInvitationFail(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(getInvitationFail(e.message));
    } else {
      yield put(getInvitationFail('Internal server error.'));
    }
  }
}

export function* watchDoctorsSagas() {
  yield takeEvery(COURSES_ACTIONS.GET_COURSES_DOCTOR, handleGetCourses)
  yield takeEvery(COURSES_ACTIONS.GET_DOCTORS, handleGetDoctors)
  yield takeEvery(COURSES_ACTIONS.GET_INVITATION, handleGetInvitation)
  yield takeEvery(COURSES_ACTIONS.ACCEPT_INVITATION, handleAcceptInvitation)
  yield takeEvery(COURSES_ACTIONS.REJECT_INVITATION, handleRejectInvitation)
  yield takeEvery(COURSES_ACTIONS.REMOVE_DOCTOR, handleRemoveDoctor)
}
