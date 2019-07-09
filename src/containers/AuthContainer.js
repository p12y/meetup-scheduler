import React, { useState } from 'react';
import LoginLayerContext from 'context/LoginLayerContext';

function AuthContainer(props) {
  const [loginLayerOpen, setLoginLayerOpen] = useState(true);
  const toggleLoginLayer = () =>
    setLoginLayerOpen(currentState => !currentState);

  return (
    <LoginLayerContext.Provider
      value={{ toggle: toggleLoginLayer, open: loginLayerOpen }}
    >
      {props.children}
    </LoginLayerContext.Provider>
  );
}

export default AuthContainer;
