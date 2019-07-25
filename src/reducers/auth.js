import * as types from 'constants/auth';
import * as formStates from 'constants/emailSignInForm';

const auth = (
  state = {
    currentUser: null,
    loginLayerOpen: false,
    formState: formStates.SIGN_IN_WITH_PROVIDERS,
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
        formState: formStates.SIGN_IN_WITH_PROVIDERS,
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
        formState: formStates.INPUT_EMAIL,
      };
    case types.CANCEL_MAIL_SIGN_IN:
      return {
        ...state,
        formState: formStates.SIGN_IN_WITH_PROVIDERS,
      };
    case types.EMAIL_IN_USE_BY_PROVIDER:
      return {
        ...state,
        formState: formStates.SIGN_IN_WITH_EXISTING_PROVIDER,
        existingEmailProvider: action.provider,
      };
    case types.EMAIL_USER_EXISTS:
      return {
        ...state,
        formState: formStates.SIGN_IN_WITH_EMAIL,
      };
    case types.RESET_LOGIN_LAYER:
      return {
        ...state,
        existingEmailProvider: null,
        formState: formStates.SIGN_IN_WITH_PROVIDERS,
      };
    case types.SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILURE:
      return {
        ...state,
        emailError: action.emailError || '',
        passwordError: action.passwordError || '',
        displayNameError: action.displayNameError || '',
      };
    case types.CLEAR_ALL_FORM_ERRORS:
      return {
        ...state,
        emailError: '',
        passwordError: '',
        displayNameError: '',
      };
    case 'CLEAR_FORM_ERROR':
      return {
        ...state,
        [action.error]: '',
      };
    case types.EMAIL_AVAILABLE_TO_CREATE:
      return {
        ...state,
        formState: formStates.CREATE_EMAIL_ACCOUNT,
      };
    default:
      return state;
  }
};

export default auth;
