import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Text, Anchor } from 'grommet';
import moment from 'moment';
import styled from 'styled-components';
import { Like, Dislike, Star } from 'grommet-icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { castVote, setVotes } from 'actions/polls';

const StarContainer = styled.div`
  padding: 0.2em;
  position: absolute;
  right: 0;
  top: 0;
`;

const SelectButton = styled(Box)`
  cursor: pointer;
`;

const ButtonContent = styled.span`
  display: inline-flex;
  margin: 0;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 0;
`;

const Container = styled(Box)`
  position: relative;
`;

function DateBox({ date, withVotes, top, pollId, votes, isDemo }) {
  const userId = useSelector(
    state => state.auth.currentUser && state.auth.currentUser.uid
  );
  const dispatch = useDispatch();
  const momentDate = moment(date);

  const month = momentDate.format('MMM');
  const dayOfMonth = momentDate.format('D');
  const dayOfWeek = momentDate.format('dddd');

  const currentVote = votes
    ? votes.find(vote => vote.user.uid === userId)
    : null;

  const getButtonBackground = type => {
    const defaultColor = 'light-3';
    if (currentVote) {
      return currentVote.vote === type ? 'accent-1' : defaultColor;
    }
    return defaultColor;
  };

  const voteCounts = votes
    ? votes.reduce(
        (lengths, vote) => {
          vote.vote === 'yes' ? (lengths.yes += 1) : (lengths.no += 1);
          return lengths;
        },
        { yes: 0, no: 0 }
      )
    : {};

  const handleClick = callback => () => (!isDemo ? callback() : null);

  return (
    <Container
      elevation="medium"
      background="brand"
      color="light"
      round="medium"
      width="auto"
      pad="small"
      align="center"
      margin="small"
      basis="small"
    >
      {top && (
        <StarContainer>
          <Star color="accent-4" size="large" />
        </StarContainer>
      )}
      <Text weight="bold" margin="xsmall">
        {month}
      </Text>
      <Text margin="xsmall" weight="bold" size="xxlarge">
        {dayOfMonth}
      </Text>
      <Text margin="xsmall">{dayOfWeek}</Text>
      {withVotes && (
        <>
          <Box direction="row" fill>
            <SelectButton
              fill
              pad="small"
              background={getButtonBackground('yes')}
              margin="xsmall"
              round="small"
              onClick={handleClick(() => {
                dispatch(castVote({ date, pollId, vote: 'yes' }));
              })}
            >
              <Box direction="row" justify="around">
                <ButtonContent>{voteCounts.yes || 0}</ButtonContent>
                <ButtonContent>
                  <Like />
                </ButtonContent>
              </Box>
            </SelectButton>
            <SelectButton
              fill
              pad="small"
              background={getButtonBackground('no')}
              margin="xsmall"
              round="small"
              onClick={handleClick(() => {
                dispatch(castVote({ date, pollId, vote: 'no' }));
              })}
            >
              <Box direction="row" justify="around">
                <ButtonContent>{voteCounts.no || 0}</ButtonContent>
                <ButtonContent>
                  <Dislike />
                </ButtonContent>
              </Box>
            </SelectButton>
          </Box>
          <div style={{ minHeight: '1.5em' }}>
            {Boolean(votes.length) && (
              <Anchor onClick={handleClick(() => dispatch(setVotes(votes)))}>
                See who voted
              </Anchor>
            )}
          </div>
        </>
      )}
    </Container>
  );
}

DateBox.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.instanceOf(Date).isRequired,
  ]),
  withVotes: PropTypes.bool,
  top: PropTypes.bool,
  votes: PropTypes.array,
};

export default DateBox;
