import React from 'react';
import { Anchor, Text, Box } from 'grommet';
import PropTypes from 'prop-types';

function PollItem({ name, numParticipants, onClick }) {
  return (
    <Box
      justify="center"
      pad={{
        top: 'medium',
      }}
      direction="row"
    >
      <Box
        direction="row"
        justify="between"
        round="medium"
        basis="full"
        pad="medium"
        background="light-2"
      >
        <Text onClick={onClick}>
          <Anchor label={name} />
        </Text>
        <Text>{numParticipants} participants</Text>
      </Box>
    </Box>
  );
}

PollItem.propTypes = {
  name: PropTypes.string.isRequired,
  numParticipants: PropTypes.number.isRequired,
};

export default PollItem;
