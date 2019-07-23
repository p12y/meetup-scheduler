import React, { useCallback } from 'react';
import { Button } from 'grommet';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  signInWithFacebook,
  signInWithTwitter,
  signInWithGoogle,
  signInWithMail,
} from 'actions/auth';

const SignInButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: left;
`;

const toTitleCase = str => str.charAt(0).toUpperCase() + str.slice(1);

function LoginButton({ icon, provider }) {
  const dispatch = useDispatch();
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

  const providerName = toTitleCase(provider);
  return (
    <SignInButtonContainer>
      <Button
        fill="horizontal"
        icon={icon}
        label={`Sign in with ${providerName}`}
        onClick={signIn(provider)}
      />
    </SignInButtonContainer>
  );
}

LoginButton.propTypes = {
  icon: PropTypes.element.isRequired,
  provider: PropTypes.string.isRequired,
};

export default LoginButton;
