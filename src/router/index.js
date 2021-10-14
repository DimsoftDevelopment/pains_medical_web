import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {isAuthenticated} from '../pages/auth/actions';
// import {push} from 'connected-react-router';
import {Switch} from "react-router-dom";
import {ROUTES} from './routes';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SignIn from '../pages/auth';
import Dashboard from '../pages/dashboard';
import Settings from '../pages/settings';
import ProfileCreation from '../pages/auth/ProfileCreation';
import ProfileDetails from '../pages/auth/ProfileDetails';
import Courses from '../pages/courses';
import CreateCourse from '../pages/createCourse';
import Family from '../pages/family';
import Meds from '../pages/meds';
import CreateMedication from '../pages/createMedication';

const Routes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated());
  }, [dispatch]);
  return (
    <Switch>
      <PublicRoute exact path={ROUTES.HOME} component={SignIn} />
      <PublicRoute exact path={ROUTES.SIGN_IN} component={SignIn} />
      <PublicRoute exact path={ROUTES.PROFILE_CREATION} component={ProfileCreation} />
      <PublicRoute exact path={ROUTES.PROFILE_DETAILS} component={ProfileDetails} />
      <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
      <PrivateRoute exact path={ROUTES.COURSES} component={Courses} />
      <PrivateRoute exact path={ROUTES.CREATE_COURSE} component={CreateCourse} />
      <PrivateRoute exact path={ROUTES.FAMILY} component={Family} />
      <PrivateRoute exact path={ROUTES.MEDS} component={Meds} />
      <PrivateRoute exact path={ROUTES.CREATE_MEDICATION} component={CreateMedication} />
      <PrivateRoute exact path={ROUTES.SETTINGS} component={Settings} />
    </Switch>
  );
}

export default Routes;
