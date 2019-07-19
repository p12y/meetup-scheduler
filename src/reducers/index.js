import { combineReducers } from 'redux';
import auth from 'reducers/auth';
import polls from 'reducers/polls';

const rootReducer = combineReducers({
  auth,
  polls,
});

export default rootReducer;
