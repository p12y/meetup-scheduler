import React from "react";
import { Grommet } from "grommet";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import theme from "config/theme";
import AppBar from "components/AppBar";
import Dashboard from "pages/Dashboard";
import NewPoll from "pages/polls/NewPoll";
import Poll from "pages/polls/Poll";
import { signIn, signOut } from "actions/auth";
import "./App.css";

function App(props) {
  return (
    <Router>
      <Grommet full theme={theme}>
        <AppBar />
        <Route exact path="/" component={Dashboard} />
        <Route path="/polls/new" component={NewPoll} />
        <Route path="/p/:id" component={Poll} />
      </Grommet>
    </Router>
  );
}

const mapStateToProps = ({ auth }) => ({
  auth
});

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(signIn()),
  signOut: () => dispatch(signOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
