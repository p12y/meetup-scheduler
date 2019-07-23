import React, { useCallback } from 'react';
import { Box, Button, Heading, Layer } from 'grommet';
import * as GrommetIcons from 'grommet-icons';
import { useSelector, useDispatch } from 'react-redux';
import LoginButton from 'components/common/LoginButton';
import { closeLoginLayer } from 'actions/auth';
import EmailSignInForm from './EmailSignInForm';
import { providers } from 'helpers/authHelper';

const providerNames = providers.providerNames;

function LoginLayer() {
  const open = useSelector(state => state.auth.loginLayerOpen);
  const formState = useSelector(state => state.auth.formState);
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
                Sign in to continue!
              </Heading>
              <Button icon={<GrommetIcons.Close />} onClick={onClose} />
            </Box>
            <>
              {formState === 'sign-in-with-providers' ?
                <>
                  {providerNames.map(provider => (
                    <LoginButton
                      provider={provider}
                      key={provider}
                      icon={React.createElement(GrommetIcons[provider], {
                        color: 'plain',
                      })}
                    />
                  ))}
                </> : <EmailSignInForm />}
            </>
          </Box>
        </Layer>
      )}
    </Box>
  );
}

export default LoginLayer;
