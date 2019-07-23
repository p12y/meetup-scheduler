import React, { useState, useCallback, useEffect } from 'react';
import { FormField, TextInput, Button, Heading, Text } from 'grommet';
import * as GrommetIcons from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FormHeading from './FormHeading';
import { cancelMailSignIn, checkEmailExists, signInWithEmailAndPassword } from 'actions/auth';
import LoginButton from 'components/common/LoginButton';

/**
 * Steps
 * sign-in-with-providers
 * input-email
 * sign-in-with-existing-provider
 * create-email-account
 * sign-in-with-email
 */

const ButtonGroup = styled.div`
  text-align: right;
`;

function getHeading(formStep) {
  const headings = {
    'input-email': 'Sign in with email',
    'sign-in-with-existing-provider': 'You already have an account',
    'create-account': 'Create account',
    'sign-in': 'Sign in with email',
  };
  return headings[formStep];
}

function EmailInput({ value, name, onChange }) {
  return (
    <FormField label="Email">
      <TextInput value={value} name={name} onChange={onChange} />
    </FormField>
  );
}

function ActionButtons({ cancelAction, cancelText, showCancel, nextAction, nextText }) {
  return (
    <ButtonGroup>
      {showCancel && <Button margin="small" label={cancelText} onClick={cancelAction} />}
      <Button
        label={nextText}
        primary
        onClick={nextAction}
      />
    </ButtonGroup>
  );
}

ActionButtons.defaultProps = {
  cancelText: 'Cancel',
  nextText: 'Next',
  showCancel: true,
};

function EmailInUseByProviderForm({ provider }) {
  return (
    <LoginButton
      provider={"Google"}
      key={"Google"}
      onClick={() => { }}
    // icon={}
    />
  );
}

// function renderCreateAccountForm() {
//   return (
//     <>
//       {renderEmailInput()}
//       <FormField label="First & last name">
//         <TextInput />
//       </FormField>
//       <FormField label="Choose password">
//         <TextInput />
//       </FormField>
//     </>
//   );
// }

// function renderSignInForm() {
//   return (
//     <>
//       {renderEmailInput()}
//       <FormField label="Password">
//         <TextInput />
//       </FormField>
//     </>
//   );
// }

function EmailSignInForm() {
  const dispatch = useDispatch();
  const [emailForm, setEmailForm] = useState({
    email: '',
    fullName: '',
    password: '',
  });
  const formState = useSelector(state => state.auth.formState);
  const existingEmailProvider = useSelector(state => state.auth.existingEmailProvider);

  const handleInput = (e) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
  }

  return (
    <>
      <FormHeading text={getHeading(formState)} />
      {{
        'input-email': (
          <>
            <EmailInput value={emailForm.email} name="email" onChange={handleInput} />
            <ActionButtons
              cancelAction={() => dispatch(cancelMailSignIn())}
              nextAction={() => dispatch(checkEmailExists(emailForm.email))}
            />
          </>
        ),
        'sign-in-with-existing-provider': (
          <>
            <Text>You've already used <Text weight="bold">{emailForm.email}</Text>.</Text>
            <Text>Sign in with {existingEmailProvider} to continue.</Text>
            {existingEmailProvider && <LoginButton
              provider={existingEmailProvider}
              key={existingEmailProvider}
              icon={React.createElement(GrommetIcons[existingEmailProvider], {
                color: 'plain',
              })}
            />}
          </>
        ),
        'sign-in-with-email': <>
          <EmailInput value={emailForm.email} name="email" onChange={handleInput} />
          <FormField label="Password">
            <TextInput type="password" value={emailForm.password} name="password" onChange={handleInput} />
          </FormField>
          <ActionButtons
            cancelAction={() => dispatch(cancelMailSignIn())}
            nextAction={() => dispatch(signInWithEmailAndPassword({ email: emailForm.email, password: emailForm.password }))}
            nextText="Sign in"
            showCancel={false}
          />
        </>,
        'create-email-account': null,
      }[formState]}
    </>
  );
}

export default EmailSignInForm;
