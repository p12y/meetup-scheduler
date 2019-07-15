import firebase from 'lib/firebase';

export const signIn = user => ({
  type: 'SIGN_IN',
  payload: user
});

export const signOut = () => ({
  type: 'SIGN_OUT',
});

export const openLoginLayer = () => ({
  type: 'OPEN_LOGIN_LAYER',
});

export const closeLoginLayer = () => ({
  type: 'CLOSE_LOGIN_LAYER',
});

export const signInWithFacebook = () => async dispatch => {
  const provider = new firebase.auth.FacebookAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  const user = result.user;
  return dispatch(signIn(user));
};