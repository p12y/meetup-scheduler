const auth = (
  state = {
    currentUser: null,
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
    case 'SET_CURRENT_USER':
      return {
        ...state,
        loginLayerOpen: action.currentUser ? false : state.loginLayerOpen,
        currentUser: action.currentUser,
      };
    default:
      return state;
  }
};

export default auth;
