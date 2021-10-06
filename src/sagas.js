import {fork} from 'redux-saga/effects';
import {watchAuthSagas} from './pages/auth/sagas';
import {watchProfileSagas} from './pages/settings/sagas';
import {watchFamilySagas} from './pages/family/sagas';
import {watchDashboardSagas} from './pages/dashboard/sagas';

export default function* rootSaga() {
  yield fork(watchAuthSagas);
  yield fork(watchProfileSagas);
  yield fork(watchFamilySagas);
  yield fork(watchDashboardSagas);
}
