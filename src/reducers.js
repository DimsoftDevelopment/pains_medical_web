import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {authState} from './pages/auth/reducer';
import {profileState} from './pages/settings/reducer';
import {pageWrapperState} from './pages/pageWrapper/reducer';
import {familyState} from './pages/family/reducer';
import {dashboardState} from './pages/dashboard/reducer';

const reducers = (history) => combineReducers({
  router: connectRouter(history),
  authState,
  profileState,
  pageWrapperState,
  familyState,
  dashboardState,
});

export default reducers;
