import React from 'react'
// import {useDispatch} from 'react-redux';
// import {authActions} from '../redux/actions';
// import {push} from 'connected-react-router';
import {Switch, Route} from "react-router-dom";
// import {ROUTES} from './routes';
// import PrivateRoute from './PrivateRoute';
// import PageWrapper from '@components/Markup/PageWrapper'


const Routes = () => {
  return (
    // <PageWrapper>
      <Switch>
        <Route exact path='/' component={() => <div />} />
      </Switch>
    // </PageWrapper>
  )
}

export default Routes
