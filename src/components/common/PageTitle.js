import React from 'react';
import { Box, Heading } from 'grommet';

function PageTitle({ title, basis, children }) {
  return (
    <Box justify="center" direction="row">
      <Box direction="row" align="center" justify="between" basis={basis}>
        <Heading size="small" color="dark-2">
          {title}
        </Heading>
        {children}
      </Box>
    </Box>
  );
}

export default PageTitle;
