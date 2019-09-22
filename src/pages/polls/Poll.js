import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import PageTitle from 'components/common/PageTitle';
import { Info, Location, ShareOption } from 'grommet-icons';
import { Text, Box, Button, Paragraph, ResponsiveContext } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchPoll, unsubscribePollObserver } from 'actions/polls';
import DateBox from 'components/poll/DateBox';
import WhoVotedLayer from 'components/poll/WhoVotedLayer';
import AsyncProgressComponent from 'components/AsyncProgressComponent';
import ShareLayer from 'components/poll/ShareLayer';

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

function Poll({ match }) {
  const dispatch = useDispatch();
  const size = useContext(ResponsiveContext);
  const pollData = useSelector(state => state.polls.pollData);
  const currentUser = useSelector(state => state.auth.currentUser);
  const topDate = useSelector(state => state.polls.topDate);
  const isLoading = useSelector(state => state.polls.isLoading);
  const isPerformingAsync = useSelector(state => state.polls.isPerformingAsync);
  const [isShareLayerOpen, setIsShareLayerOpen] = useState(false);
  const pollId = match.params.id;
  const shareUrl = window.location.href;

  useEffect(() => {
    if (pollId) {
      dispatch(fetchPoll(pollId));
      return () => dispatch(unsubscribePollObserver());
    }
  }, [dispatch, pollId]);

  return (
    <>
      <AsyncProgressComponent
        isLoading={isLoading}
        isPerformingAsync={isPerformingAsync}
      >
        {pollData && (
          <>
            <Container>
              <Box pad="small">
                <PageTitle size="small" title={pollData.name} />
                <Paragraph alignSelf="center" margin="none" pad="none">
                  {currentUser && (
                    <Button
                      label="Share"
                      icon={<ShareOption />}
                      onClick={() => setIsShareLayerOpen(true)}
                    />
                  )}
                </Paragraph>

                {pollData.description && (
                  <FlexText as="p">
                    <IconContainer>
                      <Info />
                    </IconContainer>
                    {pollData.description}
                  </FlexText>
                )}
                <FlexText as="p">
                  <IconContainer>
                    <Location />
                  </IconContainer>
                  {pollData.location}
                </FlexText>
              </Box>

              <Box
                direction="row"
                wrap
                fill
                align="center"
                justify={size === 'small' ? 'center' : 'stretch'}
                pad={{ top: 'medium', bottom: 'large' }}
              >
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
        <ShareLayer
          onClose={() => {
            setIsShareLayerOpen(false);
          }}
          shareUrl={shareUrl}
          open={isShareLayerOpen}
        />
      </AsyncProgressComponent>
    </>
  );
}

export default withRouter(Poll);
