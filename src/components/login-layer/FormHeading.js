import React from 'react';
import { Heading } from 'grommet';

const FormHeading = ({ text }) => (
  <Heading margin={{ bottom: 'small', top: 'xsmall' }} level={4} color="dark-3">
    {text}
  </Heading>
);

export default FormHeading;
