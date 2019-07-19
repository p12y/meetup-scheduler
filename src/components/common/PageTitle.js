import React from 'react';
import { Box, Heading } from 'grommet';

function PageTitle({ title, size = "medium" }) {
  return (
    <Box justify="center" direction="row">
      <Box direction="row" align="center" justify="center" basis="full">
        <Heading size={size} color="dark-2">
          {title}
        </Heading>
      </Box>
    </Box>
  );
}

export default PageTitle;
