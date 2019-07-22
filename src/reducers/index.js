import { combineReducers } from 'redux';
import { toastsReducer as toasts } from 'react-toastify-redux';
import auth from 'reducers/auth';
import polls from 'reducers/polls';

const rootReducer = combineReducers({
  toasts,
  auth,
  polls,
});

export default rootReducer;
