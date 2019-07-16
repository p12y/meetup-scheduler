import React from 'react';
import { Heading } from 'grommet';

export default ({ text }) => (
  <Heading margin={{ bottom: 'small', top: 'xsmall' }} level={5} color="dark-3">
    {text}
  </Heading>
);
