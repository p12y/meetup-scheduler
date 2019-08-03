const polls = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_POLL_SUCCESS':
      return {
        ...state,
        id: action.id,
        pollData: action.pollData,
      };
    default:
      return state;
  }
};

export default polls;
