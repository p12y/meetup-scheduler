import React from "react";
import { Grommet } from "grommet";
import theme from "config/theme";
import AppBar from "components/AppBar";

function App() {
  return (
    <Grommet theme={theme}>
      <AppBar />
    </Grommet>
  );
}

export default App;
