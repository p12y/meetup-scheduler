import React from 'react';
import { Box, Button, Heading } from 'grommet';
import { Login } from 'grommet-icons';

const Bar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="small"
    style={{ zIndex: '1' }}
    {...props}
  />
);

function AppBar() {
  return (
    <Bar>
      <Heading level="4" margin="none">
        App name
      </Heading>
      <Button icon={<Login />} onClick={() => {}} />
    </Bar>
  );
}

export default AppBar;
