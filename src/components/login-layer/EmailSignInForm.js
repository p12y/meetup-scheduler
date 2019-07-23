import React, { useState, useCallback, useEffect } from 'react';
import { FormField, TextInput, Button, Heading, Text } from 'grommet';
import * as GrommetIcons from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FormHeading from './FormHeading';
import { cancelMailSignIn, checkEmailExists } from 'actions/auth';
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

function ActionButtons({ cancelAction, nextAction }) {
  return (
    <ButtonGroup>
      <Button margin="small" label="Cancel" onClick={cancelAction} />
      <Button
        label="Next"
        primary
        onClick={nextAction}
      />
    </ButtonGroup>
  );
}

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
    setEmailForm({ [e.target.name]: e.target.value });
  }

  // function renderEmailForm() {
  //   switch ()
  //   return (
  //     <>
  //       <EmailInput value={formState.email} name="email" onChange={handleInput} />
  //       <ActionButtons
  //         cancelAction={() => dispatch(cancelMailSignIn())}
  //         nextAction={() => dispatch(checkEmailExists(formState.email))}
  //       />
  //     </>
  //   );
  // }
  // const renderActionButtons = useCallback(() => {
  //   return (
  //     <ButtonGroup>
  //       <Button margin="small" label="Cancel" onClick={() => { dispatch(cancelMailSignIn()) }} />
  //       <Button
  //         label="Next"
  //         primary
  //         onClick={() => {
  //           setFormStep('create-account');
  //         }}
  //       />
  //     </ButtonGroup>
  //   );
  // }, [dispatch]);

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
        'create-email-account': null,
        'sign-in-with-email': null,
      }[formState]}
    </>
  );
}

export default EmailSignInForm;
