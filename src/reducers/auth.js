const auth = (
  state = {
    currentUser: null,
    loginLayerOpen: false,
    formState: 'sign-in-with-providers',
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
        formState: 'sign-in-with-providers',
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
        formState: 'input-email',
      };
    case 'CANCEL_MAIL_SIGN_IN':
      return {
        ...state,
        formState: 'sign-in-with-providers',
      };
    case 'EMAIL_IN_USE_BY_PROVIDER':
      return {
        ...state,
        formState: 'sign-in-with-existing-provider',
        existingEmailProvider: action.provider,
      };
    case 'RESET_LOGIN_LAYER':
      return {
        ...state,
        existingEmailProvider: null,
        formState: 'sign-in-with-providers',
      };
    default:
      return state;
  }
};

export default auth;
