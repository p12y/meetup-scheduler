const polls = (
  state = {
    isLoading: true,
    isPerformingAsync: false,
  },
  action
) => {
  switch (action.type) {
    case 'FETCH_POLL_SUCCESS':
      return {
        ...state,
        id: action.id,
        pollData: action.pollData,
        topDate: action.topDate,
        isLoading: false,
        isPerformingAsync: false,
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
        isLoading: false,
        isPerformingAsync: false,
      };
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SET_PERFORMING_ASYNC':
      return {
        ...state,
        isPerformingAsync:
          action.componentName === 'polls' ? true : state.isPerformingAsync,
      };
    case 'UNSUBSCRIBE_POLL':
      return {
        ...state,
        pollData: null,
      };
    default:
      return state;
  }
};

export default polls;
