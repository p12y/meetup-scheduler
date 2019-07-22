const auth = (
  state = {
    currentUser: null,
    loginLayerOpen: false,
    formState: 'initial',
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
        formState: 'initial',
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        loginLayerOpen: action.currentUser ? false : state.loginLayerOpen,
        currentUser: action.currentUser,
      };
    case 'SIGN_IN_WITH_MAIL':
      return {
        ...state,
        formState: 'email',
      };
    case 'CANCEL_MAIL_SIGN_IN':
      return {
        ...state,
        formState: 'initial',
      };
    default:
      return state;
  }
};

export default auth;
