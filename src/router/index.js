import React from 'react';
// import {useDispatch} from 'react-redux';
// import {authActions} from '../redux/actions';
// import {push} from 'connected-react-router';
import {Switch, Route} from "react-router-dom";
import {ROUTES} from './routes';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SignIn from '@pages/auth/SignIn';
import Dashboard from '../pages/Dashboard';


const Routes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.HOME} component={SignIn} />
      <PublicRoute exact path={ROUTES.HOME} component={SignIn} />
      <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
      <PrivateRoute exact path={ROUTES.COURSES} component={Dashboard} />
      <PrivateRoute exact path={ROUTES.FAMILY} component={Dashboard} />
      <PrivateRoute exact path={ROUTES.MEDS} component={Dashboard} />
      <PrivateRoute exact path={ROUTES.SETTINGS} component={Dashboard} />
    </Switch>
  );
}

export default Routes;
