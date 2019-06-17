import React from "react";
import { Box, Heading, Button } from "grommet";
import { AddCircle } from "grommet-icons";
import { Link } from "react-router-dom";
import PollItem from "components/dashboard/PollItem";
import PageTitle from "components/common/PageTitle";

const allPolls = [
  {
    name: "Bill's Birthday",
    numParticipants: 5
  },
  {
    name: "Meetup with the crew",
    numParticipants: 15
  },
  {
    name: "Big beats manifesto meetup",
    numParticipants: 0
  }
];

function Dashboard() {
  return (
    <>
      <PageTitle title="Your polls" basis="2/3">
        <Link to="/polls/new">
          <Button primary icon={<AddCircle />} label="New poll" />
        </Link>
      </PageTitle>
      {allPolls.map(poll => (
        <PollItem
          key={poll.name}
          name={poll.name}
          numParticipants={poll.numParticipants}
        />
      ))}
    </>
  );
}

export default Dashboard;
