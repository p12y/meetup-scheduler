import React, { useCallback } from 'react';
import { Box, Button, Heading } from 'grommet';
import { Login, Logout } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
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

const ProfileImageButton = styled.div`
  border-radius: 50%;
  background: white;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  border-radius: 50%;
  width: 2.7rem;
  height: 2.7rem;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ProfileContainer = styled.div`
  margin-right: 0.5rem;
`;

function AppBar() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth).currentUser;
  const renderAccountButton = useCallback(
    () => {
      const photoURL = currentUser.photoURL;
      if (photoURL) {
        return (
          <ProfileImageButton onClick={() => dispatch(signOut())}>
            <ImageContainer>
              <ProfileImage src={photoURL} objectFit="contain" />
            </ImageContainer>
          </ProfileImageButton>
        );
      }
      return <Button icon={<Logout />} onClick={() => dispatch(signOut())} />;
    },
    [dispatch, currentUser]);

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
