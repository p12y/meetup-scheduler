const auth = (
  state = {
    isSignedIn: false,
    loginLayerOpen: false,
  },
  action
) => {
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
      return {
        ...state,
        currentUser: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default auth;
