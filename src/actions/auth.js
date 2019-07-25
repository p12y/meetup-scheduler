import firebase from 'lib/firebase';
import { providers, AuthError } from 'helpers/authHelper';

// To use emulated functions, uncomment the line below:
// firebase.functions().useFunctionsEmulator('http://localhost:5001');

const INVALID_EMAIL_MESSAGE = 'That email address is not valid';
const EMAIL_IN_USE_MESSAGE = 'That email address is already used by another account';
const USER_NOT_FOUND_MESSAGE =
  "That email address doesn't match an existing account";
const WRONG_PASSWORD_MESSAGE = "The email and password you entered don't match";
const WEAK_PASSWORD_MESSAGE = 'Your password must be 6 characters long or more';

export const setCurrentUser = currentUser => ({
  type: 'SET_CURRENT_USER',
  currentUser,
});

export const openLoginLayer = () => ({
  type: 'OPEN_LOGIN_LAYER',
});

export const signInWithMail = () => ({
  type: 'SIGN_IN_WITH_MAIL',
});

export const cancelMailSignIn = () => (dispatch) => {
  dispatch(clearFormErrors());
  dispatch({ type: 'CANCEL_MAIL_SIGN_IN' });
};

export const clearFormErrors = () => ({
  type: 'CLEAR_FORM_ERRORS',
});

export const emailInUseByProvider = provider => ({
  type: 'EMAIL_IN_USE_BY_PROVIDER',
  provider,
});

export const emailUserExists = () => ({
  type: 'EMAIL_USER_EXISTS',
});

export const emailAvailableToCreate = () => ({
  type: 'EMAIL_AVAILABLE_TO_CREATE',
});

export const signInWithEmailAndPasswordFailure = ({
  emailError,
  passwordError,
  displayNameError,
}) => ({
  type: 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILURE',
  emailError,
  passwordError,
  displayNameError,
});

export const resetLoginLayer = () => dispatch => {
  dispatch(clearFormErrors());
  dispatch({ type: 'RESET_LOGIN_LAYER' });
};

export const closeLoginLayer = () => dispatch => {
  dispatch(resetLoginLayer());
  dispatch({ type: 'CLOSE_LOGIN_LAYER' });
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
  try {
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
      dispatch(
        signInWithEmailAndPasswordFailure({ emailError: INVALID_EMAIL_MESSAGE })
      );
    } else if (error.code === 'not-found') {
      // Create new account
      dispatch(emailAvailableToCreate());
    } else {
      console.error(error.code);
    }
  }
};

export const signInWithEmailAndPassword = ({ email, password }) => dispatch => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(resetLoginLayer());
    })
    .catch(error => {
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
    });
};

export const createUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => async dispatch => {
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

    result.user
      .updateProfile({
        displayName,
      })
      .catch(err => console.error(err));

    dispatch(resetLoginLayer());
  } catch (error) {
    console.log(error.code);
    switch (error.code) {
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
  }
};

export const signOut = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .catch(error => console.error(error));
};
