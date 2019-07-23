import firebase from 'lib/firebase';
import { providers } from 'helpers/authHelper';

export const setCurrentUser = currentUser => ({
  type: 'SET_CURRENT_USER',
  currentUser,
});

export const openLoginLayer = () => ({
  type: 'OPEN_LOGIN_LAYER',
});

export const closeLoginLayer = () => ({
  type: 'CLOSE_LOGIN_LAYER',
});

/**
 * Signs the user in with popup for the specified provider
 * @param {{providerName: string, scopes: string[]}} - Options
 * @returns {function} - Function that returns an action
 */
async function signInWithPopup({ providerName, scopes = [] }) {
  try {
    const provider = new firebase.auth[`${providerName}AuthProvider`]();
    scopes.forEach(scope => provider.addScope(scope));
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    return () => setCurrentUser(user);
  } catch (error) {
    return console.error(error);
  }
}

export const signInWithFacebook = () => async (dispatch) => {
  const action = await signInWithPopup({
    providerName: 'Facebook',
  });
  if (action) {
    dispatch(resetLoginLayer());
    dispatch(action());
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  const action = await signInWithPopup({
    providerName: 'Google',
    scopes: ['profile'],
  });
  if (action) {
    dispatch(resetLoginLayer());
    dispatch(action());
  }
};

export const signInWithTwitter = () => async (dispatch) => {
  const action = await signInWithPopup({
    providerName: 'Twitter',
  });
  if (action) {
    dispatch(resetLoginLayer());
    dispatch(action());
  }
};

export const signInWithMail = () => ({
  type: 'SIGN_IN_WITH_MAIL',
});

export const cancelMailSignIn = () => ({
  type: 'CANCEL_MAIL_SIGN_IN',
});

export const resetLoginLayer = () => ({
  type: 'RESET_LOGIN_LAYER',
});

export const checkEmailExists = email => async (dispatch) => {
  try {
    const getUserByEmail = firebase.functions().httpsCallable('getUserByEmail');
    const result = await getUserByEmail({ email });
    if (result.data) {
      let { email, provider } = result.data;
      provider = providers.getProviderNameById(provider);
      if (provider) {
        dispatch(emailInUseByProvider(provider));
      } else {
        dispatch(emailUserExists());
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const emailInUseByProvider = provider => ({
  type: 'EMAIL_IN_USE_BY_PROVIDER',
  provider
});

export const emailUserExists = provider => ({
  type: 'EMAIL_USER_EXISTS',
});

export const signInWithEmailAndPassword = ({ email, password }) => async (dispatch) => {
  try {
    const result = await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch(setCurrentUser(result.user));
  } catch (error) {
    console.error(error);
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await firebase.auth().signOut();
    dispatch(setCurrentUser(null));
  } catch (error) {
    console.error(error);
  }
};

