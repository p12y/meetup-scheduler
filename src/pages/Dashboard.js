import React from "react";
import { Box, Heading, Button } from "grommet";
import { AddCircle } from "grommet-icons";
import PollItem from "components/dashboard/PollItem";

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
      <Box justify="center" direction="row" pad="small">
        <Box
          direction="row"
          align="center"
          justify="between"
          basis="2/3"
          pad="small"
        >
          <Heading size="small" color="dark-2">
            Your polls
          </Heading>
          <Button
            primary
            icon={<AddCircle />}
            label="Create a poll"
            onClick={() => {}}
          />
        </Box>
      </Box>
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
