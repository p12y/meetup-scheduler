import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'grommet';
import { AddCircle } from 'grommet-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PollItem from 'components/dashboard/PollItem';
import PageTitle from 'components/common/PageTitle';
import { fetchPolls, navigateToPoll } from 'actions/polls';
import AsyncProgressComponent from 'components/AsyncProgressComponent';

const PollsContainer = styled.div`
  width: 60%;
  margin: auto;
  text-align: right;
`;

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

  return (
    <AsyncProgressComponent isLoading={isLoading}>
      <PageTitle title="Your polls" />
      <PollsContainer>
        <Link to="/polls/new">
          <Button
            primary
            icon={<AddCircle />}
            label="New poll"
            alignSelf="end"
          />
        </Link>
        {userPolls &&
          userPolls.map(poll => (
            <PollItem
              onClick={() => dispatch(navigateToPoll({ history, id: poll.id }))}
              key={poll.id}
              name={poll.name}
              numParticipants={poll.numParticipants || 0}
            />
          ))}
      </PollsContainer>
    </AsyncProgressComponent>
  );
}

export default withRouter(Dashboard);
