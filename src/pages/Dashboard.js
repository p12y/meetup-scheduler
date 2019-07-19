import React from 'react';
import { Button } from 'grommet';
import { AddCircle } from 'grommet-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PollItem from 'components/dashboard/PollItem';
import PageTitle from 'components/common/PageTitle';

const allPolls = [
  {
    name: "Bill's Birthday",
    numParticipants: 5,
  },
  {
    name: 'Meetup with the crew',
    numParticipants: 15,
  },
  {
    name: 'Big beats manifesto meetup',
    numParticipants: 0,
  },
];

const PollsContainer = styled.div`
  width: 60%;
  margin: auto;
  text-align: right;
`;

function Dashboard() {
  return (
    <>
      <PageTitle title="Your polls" />
      <PollsContainer>
        <Link to="/polls/new">
          <Button primary icon={<AddCircle />} label="New poll" alignSelf="end" />
        </Link>
        {allPolls.map(poll => (
          <PollItem
            key={poll.name}
            name={poll.name}
            numParticipants={poll.numParticipants}
          />
        ))}
      </PollsContainer>
    </>
  );
}

export default Dashboard;
