import {fork} from 'redux-saga/effects';
import {watchAuthSagas} from './pages/auth/sagas';

export default function* rootSaga() {
  yield fork(watchAuthSagas);
}
