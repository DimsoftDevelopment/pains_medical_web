import {takeEvery, put, call} from 'redux-saga/effects';
import {COURSES_ACTIONS} from './constants';
import {
  getCoursesSuccess,
  getCoursesError,
  getCoursesByMemberSuccess,
  getCoursesByMemberError,
  getCourseSuccess,
  getCourseError,
  createCourseSuccess,
  createCourseError,
  updateCourseSuccess,
  updateCourseError,
  deleteCourseSuccess,
  deleteCourseError,
} from './actions';
import {
  togglePinModal,
  toggleNotification,
} from '../pageWrapper/actions';
import {logout} from '../auth/actions';
import {processRequest} from '../../services/Api';

function* handleGetCourses() {
  try {
    const {data} = yield call(processRequest, `/courses`, 'GET');
    if (data.courses) {
      const courses = data.courses.data;
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

function* handleGetCoursesByMember(action) {
  try {
    const {payload} = action || {};
    const {member_id} = payload || {};
    const {data} = yield call(processRequest, `/courses?user_id=${member_id}`, 'GET');
    if (data.courses) {
      const courses = data.courses.data;
      yield put(getCoursesByMemberSuccess(courses));
    } else {
      yield put(toggleNotification({
        title: 'Error',
        message: 'Something went wrong.',
        type: 'danger',
      }));
      yield put(getCoursesByMemberError());
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

      yield put(getCoursesByMemberError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: message,
        type: 'danger',
      }));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getCoursesByMemberError(errors));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: errors,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(getCoursesByMemberError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getCoursesByMemberError(statusText || 'Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: statusText || 'Internal server error.',
        type: 'danger',
      }));
    } else if (e.message) {
      yield put(getCoursesByMemberError(e.message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: e.message,
        type: 'danger',
      }));
    } else {
      yield put(getCoursesByMemberError('Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: 'Internal server error.',
        type: 'danger',
      }));
    }
  }
}

function* handleGetCourse(action) {
  try {
    const {payload} = action || {};
    const {id} = payload || {};
    const {data} = yield call(processRequest, `/courses/${id}`, 'GET');
    if (data.course) {
      const course = data.course.data;
      yield put(getCourseSuccess(course));
    } else {
      yield put(toggleNotification({
        title: 'Error',
        message: 'Something went wrong.',
        type: 'danger',
      }));
      yield put(getCourseError());
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

      yield put(getCourseError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: message,
        type: 'danger',
      }));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getCourseError(errors));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: errors,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(getCourseError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getCourseError(statusText || 'Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: statusText || 'Internal server error.',
        type: 'danger',
      }));
    } else if (e.message) {
      yield put(getCourseError(e.message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: e.message,
        type: 'danger',
      }));
    } else {
      yield put(getCourseError('Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: 'Internal server error.',
        type: 'danger',
      }));
    }
  }
}

function* handleCreateCourse(action) {
  try {
    const {payload} = action || {};
    const {course} = payload || {};
    const requestPayload = {course}
    const {data} = yield call(processRequest, `/courses`, 'POST', requestPayload);
    if (data.course) {
      const course = data.course.data;
      yield put(createCourseSuccess(course));
    } else {
      yield put(createCourseError());
      yield put(toggleNotification({
        title: 'Sorry!',
        message: data,
        type: 'danger',
      }));
    }
  } catch (e) {
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

      yield put(createCourseError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: message,
        type: 'danger',
      }));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(createCourseError(errors));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: errors,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(createCourseError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(createCourseError(statusText || 'Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: statusText || 'Internal server error.',
        type: 'danger',
      }));
    } else if (e.message) {
      yield put(createCourseError(e.message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: e.message,
        type: 'danger',
      }));
    } else {
      yield put(createCourseError('Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: 'Internal server error.',
        type: 'danger',
      }));
    }
  }
}

function* handleUpdateCourse(action) {
  try {
    const {payload} = action || {};
    const {course} = payload || {};
    const requestPayload = {course}
    const {data} = yield call(processRequest, `/courses`, 'PUT', requestPayload);
    if (data.course) {
      const course = data.course.data;
      yield put(updateCourseSuccess(course));
    } else {
      yield put(updateCourseError());
      yield put(toggleNotification({
        title: 'Sorry!',
        message: data,
        type: 'danger',
      }));
    }
  } catch (e) {
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

      yield put(updateCourseError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: message,
        type: 'danger',
      }));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(updateCourseError(errors));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: errors,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(updateCourseError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(updateCourseError(statusText || 'Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: statusText || 'Internal server error.',
        type: 'danger',
      }));
    } else if (e.message) {
      yield put(updateCourseError(e.message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: e.message,
        type: 'danger',
      }));
    } else {
      yield put(updateCourseError('Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: 'Internal server error.',
        type: 'danger',
      }));
    }
  }
}

function* handleDeleteCourse(action) {
  try {
    const {payload} = action || {};
    const {id} = payload || {};
    const {data} = yield call(processRequest, `/courses/${id}`, 'DELETE');
    if (data) {
      yield put(deleteCourseSuccess(id));
    } else {
      yield put(deleteCourseError());
      yield put(toggleNotification({
        title: 'Sorry!',
        message: data,
        type: 'danger',
      }));
    }

  } catch (e) {
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

      yield put(deleteCourseError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: message,
        type: 'danger',
      }));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(deleteCourseError(errors));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: errors,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(deleteCourseError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(deleteCourseError(statusText || 'Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: statusText || 'Internal server error.',
        type: 'danger',
      }));
    } else if (e.message) {
      yield put(deleteCourseError(e.message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: e.message,
        type: 'danger',
      }));
    } else {
      yield put(deleteCourseError('Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: 'Internal server error.',
        type: 'danger',
      }));
    }
  }
}

export function* watchCoursesSagas() {
  yield takeEvery(COURSES_ACTIONS.GET_COURSES, handleGetCourses);
  yield takeEvery(COURSES_ACTIONS.GET_COURSE_BY_MEMBER, handleGetCoursesByMember);
  yield takeEvery(COURSES_ACTIONS.GET_COURSE, handleGetCourse);
  yield takeEvery(COURSES_ACTIONS.CREATE_COURSE, handleCreateCourse);
  yield takeEvery(COURSES_ACTIONS.UPDATE_COURSE, handleUpdateCourse);
  yield takeEvery(COURSES_ACTIONS.DELETE_COURSE, handleDeleteCourse);
}
