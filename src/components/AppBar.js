import React from 'react';
import { Box, Button, Heading } from 'grommet';
import { Login, Logout } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginLayer, signOut } from 'actions/auth';

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
  const isSignedIn = Boolean(useSelector(state => state.auth).currentUser);

  return (
    <Bar>
      <Heading level="4" margin="none">
        App name
      </Heading>
      {isSignedIn ? (
        <Button icon={<Logout />} onClick={() => dispatch(signOut())} />
      ) : (
        <Button icon={<Login />} onClick={() => dispatch(openLoginLayer())} />
      )}
    </Bar>
  );
}

export default AppBar;
