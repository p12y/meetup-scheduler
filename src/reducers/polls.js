const polls = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_POLL_SUCCESS':
      return {
        ...state,
        createdPollID: action.createdPollID
      };
    case 'CREATE_POLL_FAILURE':
      return state;
    default:
      return state;
  }
};

export default polls;