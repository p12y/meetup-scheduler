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
    case 'SIGN_IN':
      console.log(action.payload);
      return {
        ...state,
        isSignedIn: true
      };
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
