import firebase from 'lib/firebase';

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
    dispatch(action());
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  const action = await signInWithPopup({
    providerName: 'Google',
    scopes: ['profile'],
  });
  if (action) {
    dispatch(action());
  }
};

export const signInWithTwitter = () => async (dispatch) => {
  const action = await signInWithPopup({
    providerName: 'Twitter',
  });
  if (action) {
    dispatch(action());
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
