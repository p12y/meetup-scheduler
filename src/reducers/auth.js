const auth = (
  state = {
    currentUser: null,
    loginLayerOpen: false,
    formState: 'sign-in-with-providers',
    existingEmailProvider: null,
    emailError: '',
    passwordError: '',
    displayNameError: '',
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
    case 'EMAIL_USER_EXISTS':
      return {
        ...state,
        formState: 'sign-in-with-email',
      };
    case 'RESET_LOGIN_LAYER':
      return {
        ...state,
        existingEmailProvider: null,
        formState: 'sign-in-with-providers',
      };
    case 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILURE':
      return {
        ...state,
        emailError: action.emailError,
        passwordError: action.passwordError,
        displayNameError: action.displayNameError,
      };
    case 'CLEAR_FORM_ERRORS':
      return {
        ...state,
        emailError: '',
        passwordError: '',
        displayNameError: '',
      };
    case 'EMAIL_AVAILABLE_TO_CREATE':
      return {
        ...state,
        formState: 'create-email-account',
      };
    default:
      return state;
  }
};

export default auth;
