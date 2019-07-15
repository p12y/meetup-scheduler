import React from 'react';
import { Box, Button, Heading } from 'grommet';
import { Login } from 'grommet-icons';
import { useDispatch } from 'react-redux';
import { openLoginLayer } from 'actions/auth';

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
  const dispatch = useDispatch();

  return (
    <Bar>
      <Heading level="4" margin="none">
        App name
      </Heading>
      <Button icon={<Login />} onClick={() => { dispatch(openLoginLayer()) }} />
    </Bar>
  );
}

export default AppBar;
