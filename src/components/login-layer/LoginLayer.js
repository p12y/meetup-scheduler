import React, { useCallback } from 'react';
import { Box, Button, Heading, Layer } from 'grommet';
import * as GrommetIcons from 'grommet-icons';
import { useSelector, useDispatch } from 'react-redux';
import LoginButton from 'components/common/LoginButton';
import { closeLoginLayer } from 'actions/auth';
import EmailSignInForm from './EmailSignInForm';
import { providers } from 'helpers/authHelper';
import { SIGN_IN_WITH_PROVIDERS } from 'constants/emailSignInForm';
import AsyncProgressComponent from 'components/AsyncProgressComponent';

const providerNames = providers.providerNames;

function LoginLayer() {
  const open = useSelector(state => state.auth.loginLayerOpen);
  const formState = useSelector(state => state.auth.formState);
  const isPerformingAsync = useSelector(state => state.auth.isPerformingAsync);

  const dispatch = useDispatch();
  const onClose = useCallback(() => dispatch(closeLoginLayer()), [dispatch]);

  return (
    <>
      {open && (
        <Layer
          position="right"
          responsive
          full="vertical"
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <AsyncProgressComponent isPerformingAsync={isPerformingAsync}>
            <Box
              fill
              overflow="auto"
              width="medium"
              pad="medium"
              onSubmit={onClose}
            >
              <Box flex={false} direction="row" justify="between">
                <Heading level={3} margin="none">
                  Sign in to continue!
                </Heading>
                <Button icon={<GrommetIcons.Close />} onClick={onClose} plain />
              </Box>
              <>
                {formState === SIGN_IN_WITH_PROVIDERS ? (
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
                  </>
                ) : (
                  <EmailSignInForm />
                )}
              </>
            </Box>
          </AsyncProgressComponent>
        </Layer>
      )}
    </>
  );
}

export default LoginLayer;
