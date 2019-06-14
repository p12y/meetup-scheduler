import React from "react";
import { Grommet } from "grommet";
import { BrowserRouter as Router, Route } from "react-router-dom";
import theme from "config/theme";
import AppBar from "components/AppBar";
import Dashboard from "pages/Dashboard";

function App() {
  return (
    <Router>
      <Grommet full theme={theme}>
        <AppBar />
        <Route exact path="/" component={Dashboard} />
      </Grommet>
    </Router>
  );
}

export default App;
