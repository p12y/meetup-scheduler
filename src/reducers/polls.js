const polls = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_POLL_SUCCESS':
      return {
        ...state,
        id: action.id,
        pollData: action.pollData,
        topDate: action.topDate,
      };
    case 'SET_VOTES':
      return {
        ...state,
        votes: action.votes,
      };
    case 'OPEN_WHO_VOTED_LAYER':
      return {
        ...state,
        whoVotedLayerOpen: true,
      };
    case 'CLOSE_WHO_VOTED_LAYER':
      return {
        ...state,
        whoVotedLayerOpen: false,
      };
    case 'FETCH_POLLS_SUCCESS':
      return {
        ...state,
        userPolls: action.polls,
      };
    default:
      return state;
  }
};

export default polls;
