import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { Text, Box } from 'grommet';
import PollItem from 'components/dashboard/PollItem';
import PageTitle from 'components/common/PageTitle';
import { fetchPolls, navigateToPoll } from 'actions/polls';
import AsyncProgressComponent from 'components/AsyncProgressComponent';
import NewPollButton from 'components/poll/NewPollButton';
import { MessageContainer, PollsContainer } from 'styled/polls';

function Dashboard({ history }) {
  const dispatch = useDispatch();
  const userPolls = useSelector(state => state.polls.userPolls);
  const currentUserId = useSelector(
    state => state.auth.currentUser && state.auth.currentUser.uid
  );
  const isLoading = useSelector(state => state.polls.isLoading);

  useEffect(() => {
    if (currentUserId) dispatch(fetchPolls(currentUserId));
  }, [dispatch, currentUserId]);

  const renderPolls = () => {
    if (!userPolls) return null;
    if (userPolls.length) {
      return userPolls.map(poll => (
        <PollItem
          onClick={() => dispatch(navigateToPoll({ history, id: poll.id }))}
          key={poll.id}
          name={poll.name}
          numParticipants={poll.numParticipants || 0}
        />
      ));
    }
    return (
      <MessageContainer>
        <Text>You don't have any polls. Create one to get started!</Text>
        <Box margin="small" />
        <NewPollButton />
      </MessageContainer>
    );
  };

  return (
    <AsyncProgressComponent isLoading={isLoading}>
      <PageTitle title="Your polls" />
      <PollsContainer>
        {userPolls && Boolean(userPolls.length) && <NewPollButton />}
        {renderPolls()}
      </PollsContainer>
    </AsyncProgressComponent>
  );
}

export default withRouter(Dashboard);
