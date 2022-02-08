import {takeEvery, put, call} from 'redux-saga/effects';
import {goBack} from 'connected-react-router';
import {MEDS_ACTIONS} from './constants';
import {
  getMedsSuccess,
  getMedsNextPageSuccess,
  getMedsError,
  getMedicationSuccess,
  getMedicationError,
  createMedicationSuccess,
  createMedicationError,
  updateMedicationSuccess,
  updateMedicationError,
  deleteMedicationSuccess,
  deleteMedicationError,
} from './actions';
import {
  togglePinModal,
  toggleNotification,
} from '../pageWrapper/actions';
import {logout} from '../auth/actions';
import {processRequest} from '../../services/Api';

function* handleGetMeds(action) {
  try {
    const {payload} = action || {};
    const {meta} = payload || {};
    const {page, per_page, query, user_id = ''} = meta || {};
    const getMedicationsSuccess = page === 1 ? getMedsSuccess : getMedsNextPageSuccess;
    const {data} = yield call(processRequest, `/medications?page${page}&per_page=${per_page}&query=${query}&user_id=${user_id}`, 'GET');
    if (data.medications) {
      const meds = data.medications.data.map(medication => medication.attributes);
      yield put(getMedicationsSuccess(meds));
    } else {
      yield put(getMedsError(data));
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

      yield put(getMedsError(message));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getMedsError(errors));
    } else if (status === 401) {
      yield put(getMedsError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getMedsError(statusText || 'Internal server error.'));
    } else if (e.message) {
      yield put(getMedsError(e.message));
    } else {
      yield put(getMedsError('Internal server error.'));
    }
  }
}

function* handleGetMedication(action) {
  try {
    const {payload} = action || {};
    const {id} = payload || {};
    const {data} = yield call(processRequest, `/medications/${id}`, 'GET');
    if (data.medication) {
      const medication = data.medication.data.attributes;
      yield put(getMedicationSuccess(medication));
    } else {
      yield put(toggleNotification({
        title: 'Error',
        message: 'Something went wrong.',
        type: 'danger',
      }));
      yield put(getMedicationError());
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

      yield put(getMedicationError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: message,
        type: 'danger',
      }));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(getMedicationError(errors));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: errors,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(getMedicationError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(getMedicationError(statusText || 'Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: statusText || 'Internal server error.',
        type: 'danger',
      }));
    } else if (e.message) {
      yield put(getMedicationError(e.message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: e.message,
        type: 'danger',
      }));
    } else {
      yield put(getMedicationError('Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: 'Internal server error.',
        type: 'danger',
      }));
    }
  }
}

function* handleCreateMedication(action) {
  try {
    const {payload} = action || {};
    const {medication} = payload || {};
    const formData = new FormData();
    const keys = Object.keys(medication);
    keys.forEach(key => {
      if (key !== 'attachments' && key !== 'images') {
        formData.append(`medication[${key}]`, medication[key]);
      } else if (key === 'images') {
        medication[key].forEach(image => {
          formData.append(`medication[attachments_attributes[]file]`, image.file);
        });
      }
    });
    const {data} = yield call(processRequest, `/medications`, 'POST', formData);
    if (data.medication) {
      const medication = data.medication.data.attributes;
      yield put(createMedicationSuccess(medication));
      yield put(toggleNotification({
        title: 'Success',
        message: 'Medication created.',
        type: 'success',
      }));
    } else {
      yield put(createMedicationError());
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

      yield put(createMedicationError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: message,
        type: 'danger',
      }));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(createMedicationError(errors));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: errors,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(createMedicationError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(createMedicationError(statusText || 'Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: statusText || 'Internal server error.',
        type: 'danger',
      }));
    } else if (e.message) {
      yield put(createMedicationError(e.message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: e.message,
        type: 'danger',
      }));
    } else {
      yield put(createMedicationError('Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: 'Internal server error.',
        type: 'danger',
      }));
    }
  }
}

function* handleUpdateMedication(action) {
  try {
    const {payload} = action || {};
    const {medication} = payload || {};
    const formData = new FormData();
    const keys = Object.keys(medication);
    keys.forEach(key => {
      if (key !== 'attachments' && key !== 'imagesForRemove' && key !== 'images') {
        formData.append(`medication[${key}]`, medication[key]);
      } else if (key === 'imagesForRemove') {
        medication[key].forEach(removeImage => {
          formData.append(`medication[attachments_attributes[]id]`, removeImage);
          formData.append(`medication[attachments_attributes[]_destroy]`, true);
        });
      } else if (key === 'images') {
        medication[key].forEach(image => {
          formData.append(`medication[attachments_attributes[]file]`, image.file);
        });
      }
    });
    const {data} = yield call(processRequest, `/medications/${medication.id}`, 'PUT', formData);
    if (data.medication) {
      const medication = data.medication.data.attributes;
      yield put(updateMedicationSuccess(medication));
      yield put(toggleNotification({
        title: 'Success',
        message: 'Medication updated.',
        type: 'success',
      }));
    } else {
      yield put(updateMedicationError());
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

      yield put(updateMedicationError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: message,
        type: 'danger',
      }));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(updateMedicationError(errors));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: errors,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(updateMedicationError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(updateMedicationError(statusText || 'Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: statusText || 'Internal server error.',
        type: 'danger',
      }));
    } else if (e.message) {
      yield put(updateMedicationError(e.message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: e.message,
        type: 'danger',
      }));
    } else {
      yield put(updateMedicationError('Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: 'Internal server error.',
        type: 'danger',
      }));
    }
  }
}

function* handleDeleteMedication(action) {
  try {
    const {payload} = action || {};
    const {id} = payload || {};
    const {data} = yield call(processRequest, `/medications/${id}`, 'DELETE');
    if (data) {
      yield put(goBack());
      yield put(toggleNotification({
        title: 'Success',
        message: 'Medication deleted.',
        type: 'success',
      }));
      yield put(deleteMedicationSuccess(id));
    } else {
      yield put(deleteMedicationError());
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

      yield put(deleteMedicationError(message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: message,
        type: 'danger',
      }));
    } else if (status === 401 && errors && errors.message[0] === 'Token expired') {
      yield put(togglePinModal());
      yield put(deleteMedicationError(errors));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: errors,
        type: 'danger',
      }));
    } else if (status === 401) {
      yield put(deleteMedicationError(error));
      yield put(logout());
    } else if (status === 500) {
      yield put(deleteMedicationError(statusText || 'Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: statusText || 'Internal server error.',
        type: 'danger',
      }));
    } else if (e.message) {
      yield put(deleteMedicationError(e.message));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: e.message,
        type: 'danger',
      }));
    } else {
      yield put(deleteMedicationError('Internal server error.'));
      yield put(toggleNotification({
        title: 'Sorry!',
        message: 'Internal server error.',
        type: 'danger',
      }));
    }
  }
}

export function* watchMedsSagas() {
  yield takeEvery(MEDS_ACTIONS.GET_MEDS, handleGetMeds);
  yield takeEvery(MEDS_ACTIONS.GET_MEDICATION, handleGetMedication);
  yield takeEvery(MEDS_ACTIONS.CREATE_MEDICATION, handleCreateMedication);
  yield takeEvery(MEDS_ACTIONS.UPDATE_MEDICATION, handleUpdateMedication);
  yield takeEvery(MEDS_ACTIONS.DELETE_MEDICATION, handleDeleteMedication);
}
