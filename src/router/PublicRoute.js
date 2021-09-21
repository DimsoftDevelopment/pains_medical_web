import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';
import {ROUTES} from './routes';
import {getToken} from '@services/LocalStorage';

const PublicRoute = (props) => {
  const token = getToken();

  return !token ? (
    <Route {...props } />
  ) : (
    <Redirect to={ROUTES.DASHBOARD} />
  );
}

PublicRoute.propTypes = {
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
  path: PropTypes.string.isRequired,
};

export default PublicRoute;
