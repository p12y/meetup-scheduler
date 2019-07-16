import React, { useState, useCallback } from 'react';
import { FormField, TextInput, Button, Heading } from 'grommet';
import styled from 'styled-components';
import FormHeading from './FormHeading';

const ButtonGroup = styled.div`
  text-align: right;
`;

function getHeading(formStep) {
  const headings = {
    'check-email': 'Sign in with email',
    'create-account': 'Create account',
    'sign-in': 'Sign in with email',
  };
  return headings[formStep];
}

function renderEmailInput() {
  return (
    <>
      <FormField label="Email">
        <TextInput />
      </FormField>
    </>
  );
}

function renderCreateAccountForm() {
  return (
    <>
      {renderEmailInput()}
      <FormField label="First & last name">
        <TextInput />
      </FormField>
      <FormField label="Choose password">
        <TextInput />
      </FormField>
    </>
  );
}

function renderSignInForm() {
  return (
    <>
      {renderEmailInput()}
      <FormField label="Password">
        <TextInput />
      </FormField>
    </>
  );
}

function EmailSignInForm() {
  const [formStep, setFormStep] = useState('check-email');
  const renderActionButtons = useCallback(() => {
    return (
      <ButtonGroup>
        <Button margin="small" label="Cancel" onClick={() => {}} />
        <Button
          label="Next"
          primary
          onClick={() => {
            setFormStep('create-account');
          }}
        />
      </ButtonGroup>
    );
  }, []);

  const renderForm = useCallback(() => {
    switch (formStep) {
      case 'check-email': {
        return renderEmailInput();
      }
      case 'create-account': {
        return renderCreateAccountForm();
      }
      case 'sign-in': {
        return renderSignInForm();
      }
      default:
        return <></>;
    }
  }, [formStep]);

  return (
    <>
      <FormHeading text={getHeading(formStep)} />
      {renderForm()}
      {renderActionButtons()}
    </>
  );
}

export default EmailSignInForm;
