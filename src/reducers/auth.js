import * as types from 'constants/auth';

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
    case types.OPEN_LOGIN_LAYER:
      return {
        ...state,
        loginLayerOpen: true,
      };
    case types.CLOSE_LOGIN_LAYER:
      return {
        ...state,
        loginLayerOpen: false,
        formState: 'sign-in-with-providers',
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        loginLayerOpen: action.currentUser ? false : state.loginLayerOpen,
        currentUser: action.currentUser,
      };
    case types.SIGN_IN_WITH_MAIL:
      return {
        ...state,
        formState: 'input-email',
      };
    case types.CANCEL_MAIL_SIGN_IN:
      return {
        ...state,
        formState: 'sign-in-with-providers',
      };
    case types.EMAIL_IN_USE_BY_PROVIDER:
      return {
        ...state,
        formState: 'sign-in-with-existing-provider',
        existingEmailProvider: action.provider,
      };
    case types.EMAIL_USER_EXISTS:
      return {
        ...state,
        formState: 'sign-in-with-email',
      };
    case types.RESET_LOGIN_LAYER:
      return {
        ...state,
        existingEmailProvider: null,
        formState: 'sign-in-with-providers',
      };
    case types.SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILURE:
      return {
        ...state,
        emailError: action.emailError,
        passwordError: action.passwordError,
        displayNameError: action.displayNameError,
      };
    case types.CLEAR_FORM_ERRORS:
      return {
        ...state,
        emailError: '',
        passwordError: '',
        displayNameError: '',
      };
    case types.EMAIL_AVAILABLE_TO_CREATE:
      return {
        ...state,
        formState: 'create-email-account',
      };
    default:
      return state;
  }
};

export default auth;
