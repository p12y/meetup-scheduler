import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grommet } from 'grommet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'lib/firebase';
import { setCurrentUser } from 'actions/auth';
import { ToastContainer } from 'react-toastify-redux';
import theme from 'config/theme';
import AppBar from 'components/AppBar';
import Dashboard from 'pages/Dashboard';
import NewPoll from 'pages/polls/NewPoll';
import Poll from 'pages/polls/Poll';
import Landing from 'pages/Landing';
import LoginLayer from 'components/login-layer/LoginLayer';
import FullPageLoader from 'components/FullPageLoader';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isLoading = useSelector(state => state.auth.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        dispatch(setCurrentUser(null));
      }
      return () => unregisterAuthObserver();
    });
  }, [dispatch]);

  if (isLoading) return <FullPageLoader />;

  return (
    <>
      <Router>
        <Grommet theme={theme}>
          <ToastContainer
            autoClose={2500}
            position="top-right"
            newestOnTop
            closeOnClick
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          <AppBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/polls/new" component={NewPoll} />
            <Route path="/p/:id" component={Poll} />
          </Switch>
          <LoginLayer />
        </Grommet>
      </Router>
    </>
  );
}

export default App;
