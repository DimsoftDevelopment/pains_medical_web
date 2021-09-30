import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {ROUTES} from './routes';
import {getToken} from '@services/LocalStorage';

const PrivateRoute = (props) => {
  const token = getToken();
  const {user} = useSelector(({authState}) => authState);

  return user && token ? (
    <Route {...props } />
  ) : (
    <Redirect to={ROUTES.SIGN_IN} />
  );
}

PrivateRoute.propTypes = {
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
