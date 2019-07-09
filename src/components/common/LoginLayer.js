import React, { useContext } from 'react';
import { Box, Button, Heading, Layer } from 'grommet';
import * as GrommetIcons from 'grommet-icons';
import LoginButton from './LoginButton';
import LoginLayerContext from 'context/LoginLayerContext';

const providers = ['Facebook', 'Google', 'Twitter', 'Mail'];

function LoginLayer() {
  const loginLayerContext = useContext(LoginLayerContext);

  return (
    <Box fill align="center" justify="center">
      {loginLayerContext.open && (
        <Layer
          position="right"
          full="vertical"
          modal
          onClickOutside={loginLayerContext.toggle}
          onEsc={loginLayerContext.toggle}
        >
          <Box
            fill="vertical"
            overflow="auto"
            width="medium"
            pad="medium"
            onSubmit={loginLayerContext.toggle}
          >
            <Box flex={false} direction="row" justify="between">
              <Heading level={3} margin="none">
                Sign in to vote!
              </Heading>
              <Button
                icon={<GrommetIcons.Close />}
                onClick={loginLayerContext.toggle}
              />
            </Box>
            {providers.map(provider => (
              <LoginButton
                provider={provider}
                key={provider}
                onClick={console.log}
                icon={React.createElement(GrommetIcons[provider], {
                  color: 'plain',
                })}
              />
            ))}
          </Box>
        </Layer>
      )}
    </Box>
  );
}

export default LoginLayer;
