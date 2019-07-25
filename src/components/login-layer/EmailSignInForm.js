import React, { useState } from 'react';
import { Text } from 'grommet';
import * as GrommetIcons from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import FormHeading from './FormHeading';
import {
  checkEmailExists,
  signInWithEmailAndPassword,
  clearFormError,
  createUserWithEmailAndPassword,
} from 'actions/auth';
import LoginButton from 'components/common/LoginButton';
import ActionButtons from './ActionButtons';
import EmailFormInput from './EmailFormInput';
import * as formStates from 'constants/emailSignInForm';

/**
 * 
 * @param {string} formStep - The current display state of the form
 * @returns {string} - The correct header for the current state
 */
function getHeading(formStep) {
  const headings = {
    [formStates.INPUT_EMAIL]: 'Sign in with email',
    [formStates.SIGN_IN_WITH_EXISTING_PROVIDER]: 'You already have an account',
    [formStates.SIGN_IN_WITH_EMAIL]: 'Sign in',
    [formStates.CREATE_EMAIL_ACCOUNT]: 'Create account',
  };
  return headings[formStep];
}

function EmailSignInForm() {
  const dispatch = useDispatch();

  const [emailForm, setEmailForm] = useState({
    email: '',
    displayName: '',
    password: '',
  });

  const {
    formState,
    existingEmailProvider,
    emailError,
    passwordError,
    displayNameError,
  } = useSelector(state => state.auth);

  const errorFields = {
    email: emailError,
    password: passwordError,
    displayName: displayNameError,
  };

  const fieldHasErrors = name => Boolean(errorFields[name]);

  const handleInput = (e) => {
    // If the field being changed contains errors, clear the error on change
    if (fieldHasErrors(e.target.name)) {
      dispatch(clearFormError(e.target.name));
    }
    // Update the field's value
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormHeading text={getHeading(formState)} />
      {
        {
          [formStates.INPUT_EMAIL]: (
            <>
              <EmailFormInput
                label="Email"
                value={emailForm.email}
                name="email"
                onChange={handleInput}
                error={emailError}
              />
              <ActionButtons
                nextAction={() => dispatch(checkEmailExists(emailForm.email))}
              />
            </>
          ),
          [formStates.SIGN_IN_WITH_EXISTING_PROVIDER]: (
            <>
              <Text>
                You've already used <Text weight="bold">{emailForm.email}</Text>.
              </Text>
              <Text>Sign in with {existingEmailProvider} to continue.</Text>
              {existingEmailProvider && (
                <LoginButton
                  provider={existingEmailProvider}
                  key={existingEmailProvider}
                  icon={React.createElement(
                    GrommetIcons[existingEmailProvider],
                    {
                      color: 'plain',
                    }
                  )}
                />
              )}
            </>
          ),
          [formStates.SIGN_IN_WITH_EMAIL]: (
            <>
              <EmailFormInput
                label="Email"
                value={emailForm.email}
                name="email"
                onChange={handleInput}
                error={emailError}
              />
              <EmailFormInput
                label="Password"
                type="password"
                value={emailForm.password}
                name="password"
                onChange={handleInput}
                error={passwordError}
              />
              <ActionButtons
                nextAction={() =>
                  dispatch(
                    signInWithEmailAndPassword({
                      email: emailForm.email,
                      password: emailForm.password,
                    })
                  )
                }
                nextText="Sign in"
                showCancel={false}
              />
            </>
          ),
          [formStates.CREATE_EMAIL_ACCOUNT]: (
            <>
              <EmailFormInput
                label="Email"
                value={emailForm.email}
                name="email"
                onChange={handleInput}
                error={emailError}
              />
              <EmailFormInput
                label="First & last name"
                value={emailForm.displayName}
                name="displayName"
                onChange={handleInput}
                error={displayNameError}
              />
              <EmailFormInput
                label="Choose password"
                type="password"
                value={emailForm.password}
                name="password"
                onChange={handleInput}
                error={passwordError}
              />
              <ActionButtons
                nextAction={() =>
                  dispatch(
                    createUserWithEmailAndPassword({
                      email: emailForm.email,
                      password: emailForm.password,
                      displayName: emailForm.displayName,
                    })
                  )
                }
                nextText="Save"
              />
            </>
          ),
        }[formState]
      }
    </>
  );
}

export default EmailSignInForm;
