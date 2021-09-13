import React from 'react'
// import {useDispatch} from 'react-redux';
// import {authActions} from '../redux/actions';
// import {push} from 'connected-react-router';
import {Switch, Route} from "react-router-dom";
import {ROUTES} from './routes';
// import PrivateRoute from './PrivateRoute';
import SignIn from '@pages/SignIn';


const Routes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.HOME} component={SignIn} />
    </Switch>
  )
}

export default Routes
