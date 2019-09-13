import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ path, component, ...rest }) {
  const currentUser = useSelector(state => state.auth.currentUser);
  if (!currentUser) return <Redirect to="/" />;
  return <Route path={path} component={component} {...rest} />;
}

export default ProtectedRoute;
