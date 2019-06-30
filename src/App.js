import React from "react";
import { Grommet } from "grommet";
import { BrowserRouter as Router, Route } from "react-router-dom";
import theme from "config/theme";
import AppBar from "components/AppBar";
import Dashboard from "pages/Dashboard";
import NewPoll from "pages/polls/NewPoll";
import Poll from "pages/polls/Poll";
import "./App.css";

function App() {
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

export default App;
