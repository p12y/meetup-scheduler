import React from 'react';
import { Grommet } from 'grommet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify-redux';
import theme from 'config/theme';
import AppBar from 'components/AppBar';
import Dashboard from 'pages/Dashboard';
import NewPoll from 'pages/polls/NewPoll';
import Poll from 'pages/polls/Poll';
import Landing from 'pages/Landing';
import LoginLayer from 'components/login-layer/LoginLayer';
import FullPageLoader from 'components/FullPageLoader';
import ProtectedRoute from 'components/ProtectedRoute';
import { useAuthObserver } from 'hooks';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isLoading = useAuthObserver();

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
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/polls/new" component={NewPoll} />
            <Route path="/p/:id" component={Poll} />
          </Switch>
          <LoginLayer />
        </Grommet>
      </Router>
    </>
  );
}

export default App;
