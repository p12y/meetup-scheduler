import React, { useCallback, useState } from 'react';
import { Box, Button, Heading, Layer } from 'grommet';
import * as GrommetIcons from 'grommet-icons';
import { useSelector, useDispatch } from 'react-redux';
import LoginButton from 'components/common/LoginButton';
import {
  closeLoginLayer,
  signInWithFacebook,
  signInWithTwitter,
  signInWithGoogle,
  signInWithMail,
} from 'actions/auth';
import EmailSignInForm from './EmailSignInForm';

const providers = ['Facebook', 'Google', 'Twitter', 'Mail'];

// initial, check-email, create-email, password

function LoginLayer() {
  const open = useSelector(state => state.auth.loginLayerOpen);
  const formState = useSelector(state => state.auth.formState);
  const dispatch = useDispatch();
  const onClose = useCallback(() => dispatch(closeLoginLayer()), [dispatch]);
  const signIn = useCallback(
    provider => {
      return () => {
        const actions = {
          Facebook: signInWithFacebook,
          Google: signInWithGoogle,
          Twitter: signInWithTwitter,
          Mail: signInWithMail,
        };
        dispatch(actions[provider]());
      };
    },
    [dispatch]
  );

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
              {formState === 'initial' ?
                <>
                  {providers.map(provider => (
                    <LoginButton
                      provider={provider}
                      key={provider}
                      onClick={signIn(provider)}
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
