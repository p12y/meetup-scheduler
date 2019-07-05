import React from "react";
import { Button } from "grommet";
import styled from "styled-components";

const SignInButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: left;
`;

const toTitleCase = str => str.charAt(0).toUpperCase() + str.slice(1);

function LoginButton({ icon, onClick, provider }) {
  const providerName = toTitleCase(provider);
  return (
    <SignInButtonContainer>
      <Button
        fill="horizontal"
        icon={icon}
        label={`Sign in with ${providerName}`}
        onClick={() => onClick(provider)}
      />
    </SignInButtonContainer>
  );
}

export default LoginButton;
