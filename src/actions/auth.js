import firebase from 'lib/firebase';
import { providers } from 'helpers/authHelper';

const INVALID_EMAIL_MESSAGE = 'That email address is not valid';
const USER_NOT_FOUND_MESSAGE = "That email address doesn't match an existing account";
const WRONG_PASSWORD_MESSAGE = "The email and password you entered don't match";

export const setCurrentUser = currentUser => ({
  type: 'SET_CURRENT_USER',
  currentUser,
});

export const openLoginLayer = () => ({
  type: 'OPEN_LOGIN_LAYER',
});

export const closeLoginLayer = () => (dispatch) => {
  dispatch(resetLoginLayer());
  dispatch({ type: 'CLOSE_LOGIN_LAYER' });
};

export const signInWithMail = () => ({
  type: 'SIGN_IN_WITH_MAIL',
});

export const cancelMailSignIn = () => ({
  type: 'CANCEL_MAIL_SIGN_IN',
});

export const resetLoginLayer = () => (dispatch) => {
  dispatch(clearFormErrors());
  dispatch({ type: 'RESET_LOGIN_LAYER' });
}

export const clearFormErrors = () => ({
  type: 'CLEAR_FORM_ERRORS',
});

export const emailInUseByProvider = provider => ({
  type: 'EMAIL_IN_USE_BY_PROVIDER',
  provider
});

export const emailUserExists = provider => ({
  type: 'EMAIL_USER_EXISTS',
});

export const signInWithEmailAndPasswordFailure = ({ emailError, passwordError }) => ({
  type: 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILURE',
  emailError,
  passwordError,
});

/**
 * Signs the user in with popup for the specified provider
 * @param {{providerName: string, scopes: string[]}} - Options
 * @returns {function} - Function that returns an action
 */
const signInWithPopup = ({ providerName, scopes = [] }) => (dispatch) => {
  const provider = new firebase.auth[`${providerName}AuthProvider`]();
  scopes.forEach(scope => provider.addScope(scope));
  firebase.auth().signInWithPopup(provider)
    .then(() => dispatch(resetLoginLayer()))
    .catch(error => console.error(error));
}

export const signInWithFacebook = () => (dispatch) => {
  dispatch(signInWithPopup({ providerName: 'Facebook' }));
};

export const signInWithGoogle = () => (dispatch) => {
  dispatch(signInWithPopup({
    providerName: 'Google',
    scopes: ['profile'],
  }));
};

export const signInWithTwitter = () => (dispatch) => {
  dispatch(signInWithPopup({
    providerName: 'Twitter',
  }));
};

export const checkEmailExists = email => async (dispatch) => {
  try {
    firebase.functions().useFunctionsEmulator('http://localhost:5001');
    const getUserByEmail = firebase.functions().httpsCallable('getUserByEmail');
    const result = await getUserByEmail({ email });
    let { provider } = result.data;
    if (provider === 'password') {
      dispatch(emailUserExists());
    } else {
      provider = providers.getProviderNameById(result.data.provider);
      dispatch(emailInUseByProvider(provider));
    }
  } catch (error) {
    if (error.code === 'invalid-argument') {
      dispatch(signInWithEmailAndPasswordFailure({ emailError: INVALID_EMAIL_MESSAGE }));
    } else if (error.code === 'not-found') {
      // Create new account
    } else {
      console.error(error.code);
    }
  }
};

export const signInWithEmailAndPassword = ({ email, password }) => (dispatch) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(resetLoginLayer());
    })
    .catch((error) => {
      const emailError = {
        'auth/invalid-email': INVALID_EMAIL_MESSAGE,
        'auth/user-not-found': USER_NOT_FOUND_MESSAGE,
      }[error.code];
      const passwordError = {
        'auth/wrong-password': WRONG_PASSWORD_MESSAGE,
      }[error.code];
      dispatch(signInWithEmailAndPasswordFailure({ emailError, passwordError }));
    });
};

export const signOut = () => (dispatch) => {
  firebase.auth().signOut().catch(error => console.error(error));
};

