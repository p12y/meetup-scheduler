import React from "react";
import { Grommet } from "grommet";
import theme from "config/theme";
import AppBar from "components/AppBar";
import Dashboard from "pages/Dashboard";

function App() {
  return (
    <Grommet full theme={theme}>
      <AppBar />
      <Dashboard />
    </Grommet>
  );
}

export default App;
