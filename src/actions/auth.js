/**
 * Uses the Firebase auth module.
 * The Fireebase auth module doesn't use native promises,
 * so they must either be wrapped in a promise, or you should
 * use then & catch methods on the promise object,
 * instead of a try/catch block.
 */

import firebase from 'lib/firebase';
import { providers, AuthError } from 'helpers/authHelper';
import * as types from 'constants/auth';
import { setPerformingAsync, unsetPerformingAsync } from 'actions/common';

// To use emulated functions, uncomment the line below:
// firebase.functions().useFunctionsEmulator('http://localhost:5001');

const INVALID_EMAIL_MESSAGE = 'That email address is not valid';
const EMAIL_IN_USE_MESSAGE =
  'That email address is already used by another account';
const USER_NOT_FOUND_MESSAGE =
  "That email address doesn't match an existing account";
const WRONG_PASSWORD_MESSAGE = "The email and password you entered don't match";
const WEAK_PASSWORD_MESSAGE = 'Your password must be 6 characters long or more';

export const setCurrentUser = currentUser => ({
  type: types.SET_CURRENT_USER,
  currentUser,
});

export const openLoginLayer = () => ({
  type: types.OPEN_LOGIN_LAYER,
});

export const signInWithMail = () => ({
  type: types.SIGN_IN_WITH_MAIL,
});

export const clearAllFormErrors = () => ({
  type: types.CLEAR_ALL_FORM_ERRORS,
});

export const clearFormError = name => dispatch => {
  const error = {
    email: 'emailError',
    displayName: 'displayNameError',
    password: 'passwordError',
  }[name];

  if (error) {
    dispatch({
      type: types.CLEAR_FORM_ERROR,
      error,
    });
  }
};

export const emailInUseByProvider = provider => ({
  type: types.EMAIL_IN_USE_BY_PROVIDER,
  provider,
});

export const emailUserExists = () => ({
  type: types.EMAIL_USER_EXISTS,
});

export const emailAvailableToCreate = () => ({
  type: types.EMAIL_AVAILABLE_TO_CREATE,
});

export const signInWithEmailAndPasswordFailure = errors => ({
  type: types.SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILURE,
  emailError: errors.emailError,
  passwordError: errors.passwordError,
  displayNameError: errors.displayNameError,
});

export const cancelMailSignIn = () => dispatch => {
  dispatch(clearAllFormErrors());
  dispatch({ type: types.CANCEL_MAIL_SIGN_IN });
};

export const resetLoginLayer = () => dispatch => {
  dispatch(clearAllFormErrors());
  dispatch({ type: types.RESET_LOGIN_LAYER });
};

export const closeLoginLayer = () => dispatch => {
  dispatch(resetLoginLayer());
  dispatch({ type: types.CLOSE_LOGIN_LAYER });
};

/**
 * Signs the user in with popup for the specified provider
 * @param {{providerName: string, scopes: string[]}} - Options
 * @returns {function} - Function that returns an action
 */
const signInWithPopup = ({ providerName, scopes = [] }) => dispatch => {
  const provider = new firebase.auth[`${providerName}AuthProvider`]();
  scopes.forEach(scope => provider.addScope(scope));
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => dispatch(resetLoginLayer()))
    .catch(error => console.error(error));
};

export const signInWithFacebook = () => dispatch => {
  dispatch(signInWithPopup({ providerName: 'Facebook' }));
};

export const signInWithGoogle = () => dispatch => {
  dispatch(
    signInWithPopup({
      providerName: 'Google',
      scopes: ['profile'],
    })
  );
};

export const signInWithTwitter = () => dispatch => {
  dispatch(
    signInWithPopup({
      providerName: 'Twitter',
    })
  );
};

export const checkEmailExists = email => async dispatch => {
  dispatch(setPerformingAsync('auth'));
  try {
    /* 
      Validate email with simple regex to avoid calling 
      cloud function with a completely invalid email
    */
    if (!email.match(/.+@.+\..+/)) {
      throw new AuthError('invalid-argument');
    }

    // Get the user by email address
    const getUserByEmail = firebase.functions().httpsCallable('getUserByEmail');
    const result = await getUserByEmail({ email });
    let { provider } = result.data;

    if (provider === 'password') {
      // Allow user to sign in with email address
      dispatch(emailUserExists());
    } else {
      // Display correct provider button to sign in
      provider = providers.getProviderNameById(result.data.provider);
      dispatch(emailInUseByProvider(provider));
    }
  } catch (error) {
    if (error.code === 'invalid-argument') {
      dispatch(
        signInWithEmailAndPasswordFailure({ emailError: INVALID_EMAIL_MESSAGE })
      );
    } else if (error.code === 'not-found') {
      // Allow user to create account with email
      dispatch(emailAvailableToCreate());
    } else {
      console.error(error.code);
    }
  }
  dispatch(unsetPerformingAsync('auth'));
};

export const signInWithEmailAndPassword = ({ email, password }) => dispatch => {
  dispatch(setPerformingAsync('auth'));
  // Sign user in
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      /* 
        Set the login layer back to default
        Sign in will be handled automatically by auth listener
      */
      dispatch(resetLoginLayer());
      dispatch(unsetPerformingAsync('auth'));
    })
    .catch(error => {
      // Set errors to be visible inline on their respective fields
      const emailError = {
        'auth/invalid-email': INVALID_EMAIL_MESSAGE,
        'auth/user-not-found': USER_NOT_FOUND_MESSAGE,
      }[error.code];

      const passwordError = {
        'auth/wrong-password': WRONG_PASSWORD_MESSAGE,
      }[error.code];

      dispatch(
        signInWithEmailAndPasswordFailure({ emailError, passwordError })
      );
      dispatch(unsetPerformingAsync('auth'));
    });
};

export const createUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => async dispatch => {
  dispatch(setPerformingAsync('auth'));
  try {
    function validatePresence(field, code, message) {
      if (!field.trim()) throw new AuthError(code, message);
    }

    validatePresence(email, 'auth/invalid-email');
    validatePresence(displayName, 'auth/invalid-name', 'Name is required');

    /*
     Wrap firebase promise in a new promise, as it uses a different
     spec, which doesn't work well with try/catch blocks
     */
    const result = await new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => resolve(user))
        .catch(error => reject(error));
    });

    // Update the display name as it can't be added on create
    result.user
      .updateProfile({
        displayName,
      })
      .catch(err => console.error(err));

    // Reset login layer
    dispatch(resetLoginLayer());
    dispatch(unsetPerformingAsync('auth'));
  } catch (error) {
    switch (error.code) {
      // Display inline error messages
      case 'auth/weak-password':
        dispatch(
          signInWithEmailAndPasswordFailure({
            passwordError: WEAK_PASSWORD_MESSAGE,
          })
        );
        break;
      case 'auth/email-already-in-use':
        dispatch(
          signInWithEmailAndPasswordFailure({
            emailError: EMAIL_IN_USE_MESSAGE,
          })
        );
        break;
      case 'auth/invalid-email':
        dispatch(
          signInWithEmailAndPasswordFailure({
            emailError: INVALID_EMAIL_MESSAGE,
          })
        );
        break;
      case 'auth/invalid-name':
        dispatch(
          signInWithEmailAndPasswordFailure({
            displayNameError: error.message,
          })
        );
        break;
      default:
        console.error(error);
        break;
    }
    dispatch(unsetPerformingAsync('auth'));
  }
};

export const signOut = () => dispatch => {
  // Sign user out - action will be dispatched by auth listener
  firebase
    .auth()
    .signOut()
    .catch(error => console.error(error));
};
