import firebase from 'lib/firebase';

const auth = (state = {
  isSignedIn: false,
  loginLayerOpen: false,
}, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN_LAYER':
      return {
        ...state,
        loginLayerOpen: true,
      };
    case 'CLOSE_LOGIN_LAYER':
      return {
        ...state,
        loginLayerOpen: false,
      };
    case 'SIGN_IN': {
      // Sign in using a popup.
      let user = null;
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // The signed-in user info.
        user = result.user;
        console.log(user)
      });

      return {
        ...state,
        user,
        isSignedIn: true,
      };
    }
    case 'SIGN_OUT':
      return {
        ...state,
        isSignedIn: false,
      };
    default:
      return state;
  }
};

export default auth;
