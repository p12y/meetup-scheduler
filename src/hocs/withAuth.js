import React from 'react';
import { signIn, signOut } from 'actions/auth';
import { connect } from 'react-redux';
import { compose } from 'redux';

const withAuth = WrappedComponent => props => <WrappedComponent {...props} />;

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(signIn()),
  signOut: () => dispatch(signOut()),
});

const composedWithAuth = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuth
);

export default composedWithAuth;
