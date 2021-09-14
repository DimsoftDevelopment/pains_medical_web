import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {authState} from './pages/auth/reducer';

const reducers = (history) => combineReducers({
  router: connectRouter(history),
  authState,
});

export default reducers;
