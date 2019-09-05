import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageTitle from 'components/common/PageTitle';
import { Info, Location } from 'grommet-icons';
import { Text, Box } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchPoll, unsubscribePollObserver } from 'actions/polls';
import DateBox from 'components/poll/DateBox';
import WhoVotedLayer from 'components/poll/WhoVotedLayer';

const Container = styled.div`
  margin-bottom: 1rem;
  margin: auto;
  width: 80%;
`;

const IconContainer = styled.span`
  margin-right: 1em;
`;

const FlexText = styled(Text)`
  display: flex;
`;

function Poll(props) {
  const dispatch = useDispatch();
  const pollData = useSelector(state => state.polls.pollData);
  const topDate = useSelector(state => state.polls.topDate);
  const pollId = props.match.params.id;

  useEffect(() => {
    if (pollId) {
      dispatch(fetchPoll(pollId));
      return () => dispatch(unsubscribePollObserver());
    }
  }, [dispatch, pollId]);

  return (
    <>
      {pollData && (
        <>
          <Container>
            <Box pad="small">
              <PageTitle size="small" title={pollData.name} />
              <FlexText as="p">
                <IconContainer>
                  <Info />
                </IconContainer>
                {pollData.name}
              </FlexText>
              <FlexText as="p">
                <IconContainer>
                  <Location />
                </IconContainer>
                {pollData.location}
              </FlexText>
            </Box>

            <Box direction="row" wrap fill align="center">
              {pollData.dates.map(dateObj => (
                <DateBox
                  key={dateObj.date}
                  date={dateObj.date}
                  withVotes
                  pollId={pollId}
                  votes={dateObj.votes}
                  top={topDate && dateObj.date === topDate.date}
                />
              ))}
            </Box>
          </Container>
          <WhoVotedLayer />
        </>
      )}
    </>
  );
}

export default withRouter(Poll);
