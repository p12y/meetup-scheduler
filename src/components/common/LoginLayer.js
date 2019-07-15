import React, { useCallback } from 'react';
import { Box, Button, Heading, Layer } from 'grommet';
import * as GrommetIcons from 'grommet-icons';
import { useSelector, useDispatch } from 'react-redux';
import LoginButton from './LoginButton';
import { closeLoginLayer, signIn } from 'actions/auth';

const providers = ['Facebook', 'Google', 'Twitter', 'Mail'];

function LoginLayer() {
  const open = useSelector(state => state.auth.loginLayerOpen);
  const dispatch = useDispatch();
  const onClose = useCallback(() => dispatch(closeLoginLayer()), [dispatch]);

  return (
    <Box fill align="center" justify="center">
      {open && (
        <Layer
          position="right"
          full="vertical"
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            fill="vertical"
            overflow="auto"
            width="medium"
            pad="medium"
            onSubmit={onClose}
          >
            <Box flex={false} direction="row" justify="between">
              <Heading level={3} margin="none">
                Sign in to vote!
              </Heading>
              <Button
                icon={<GrommetIcons.Close />}
                onClick={onClose}
              />
            </Box>
            {providers.map(provider => (
              <LoginButton
                provider={provider}
                key={provider}
                onClick={() => dispatch(signIn())}
                icon={React.createElement(GrommetIcons[provider], {
                  color: 'plain',
                })}
              />
            ))}
          </Box>
        </Layer>
      )}
    </Box >
  );
}

export default LoginLayer;
