import React, { useCallback } from 'react';
import { Box, Button, Heading } from 'grommet';
import { Login, Logout } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { openLoginLayer, signOut } from 'actions/auth';
import {
  ProfileImageButton,
  ImageContainer,
  ProfileImage,
} from 'styled/ProfileImage';

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

const ProfileContainer = styled.div`
  margin-right: 0.5rem;
`;

function AppBar() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth).currentUser;
  const renderAccountButton = useCallback(() => {
    const photoURL = currentUser.photoURL;
    if (photoURL) {
      return (
        <ProfileImageButton onClick={() => dispatch(signOut())}>
          <ImageContainer>
            <ProfileImage src={photoURL} />
          </ImageContainer>
        </ProfileImageButton>
      );
    }
    return <Button icon={<Logout />} onClick={() => dispatch(signOut())} />;
  }, [dispatch, currentUser]);

  return (
    <Bar>
      <Heading level="4" margin="none">
        App name
      </Heading>
      <ProfileContainer>
        {currentUser ? (
          renderAccountButton()
        ) : (
          <Button icon={<Login />} onClick={() => dispatch(openLoginLayer())} />
        )}
      </ProfileContainer>
    </Bar>
  );
}

export default AppBar;
