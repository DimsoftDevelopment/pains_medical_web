import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {authState} from './pages/auth/reducer';
import {profileState} from './pages/settings/reducer';
import {pageWrapperState} from './pages/pageWrapper/reducer';
import {familyState} from './pages/family/reducer';
import {dashboardState} from './pages/dashboard/reducer';
import {coursesState} from './pages/courses/reducer';
import {medsState} from './pages/meds/reducer';
import {createCourseState} from './pages/createCourse/reducer';
import { patientsState } from './pages/patients/reducer';

const reducers = (history) => combineReducers({
  router: connectRouter(history),
  authState,
  profileState,
  pageWrapperState,
  familyState,
  dashboardState,
  coursesState,
  medsState,
  createCourseState,
  patientsState,
});

export default reducers;
