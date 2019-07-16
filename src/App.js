import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grommet } from 'grommet';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'lib/firebase';
import { signIn, signOut } from 'actions/auth';
import theme from 'config/theme';
import AppBar from 'components/AppBar';
import Dashboard from 'pages/Dashboard';
import NewPoll from 'pages/polls/NewPoll';
import Poll from 'pages/polls/Poll';
import LoginLayer from 'components/common/LoginLayer';

import './App.css';

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(signIn(user));
      } else {
        dispatch(signOut);
      }
      return unregisterAuthObserver();
    });
  }, [dispatch]);

  return (
    <>
      <Router>
        <Grommet full theme={theme}>
          <AppBar />
          <Route exact path="/" component={Dashboard} />
          <Route path="/polls/new" component={NewPoll} />
          <Route path="/p/:id" component={Poll} />
          <LoginLayer />
        </Grommet>
      </Router>
    </>
  );
}

export default App;
