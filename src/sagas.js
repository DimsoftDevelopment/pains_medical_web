import {fork} from 'redux-saga/effects';
import {watchAuthSagas} from './pages/auth/sagas';
import {watchProfileSagas} from './pages/settings/sagas';

export default function* rootSaga() {
  yield fork(watchAuthSagas);
  yield fork(watchProfileSagas);
}
