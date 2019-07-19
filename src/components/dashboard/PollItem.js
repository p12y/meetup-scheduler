import React from 'react';
import { Anchor, Text, Box } from 'grommet';

function PollItem({ name, numParticipants }) {
  return (
    <Box justify="center" pad={{
      "top": "medium",

    }} direction="row">
      <Box
        direction="row"
        justify="between"
        round="medium"
        basis="full"
        pad="medium"
        background="light-2"
      >
        <Text>
          <Anchor href="#" label={name} />
        </Text>
        <Text>{numParticipants} participants</Text>
      </Box>
    </Box>
  );
}

export default PollItem;
