import React, { useCallback } from 'react';
import { Box, Button, Heading, Menu } from 'grommet';
import { Login, User } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { openLoginLayer, signOut } from 'actions/auth';
import {
  ProfileImageButton,
  ImageContainer,
  ProfileImage,
} from 'styled/profileImage';
import { UnstyledLink } from 'styled/generic';

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
    const photoURL = currentUser && currentUser.photoURL;
    if (photoURL) {
      return (
        <ProfileImageButton>
          <ImageContainer>
            <ProfileImage src={photoURL} />
          </ImageContainer>
        </ProfileImageButton>
      );
    }
    return <User />;
  }, [currentUser]);

  return (
    <Bar>
      <UnstyledLink to="/dashboard">
        <Heading level="4" margin="none">
          Meetup Polls
        </Heading>
      </UnstyledLink>
      <ProfileContainer>
        {currentUser ? (
          <Menu
            label={renderAccountButton()}
            items={[{ label: 'Sign out', onClick: () => dispatch(signOut()) }]}
          />
        ) : (
          <Button icon={<Login />} onClick={() => dispatch(openLoginLayer())} />
        )}
      </ProfileContainer>
    </Bar>
  );
}

export default AppBar;
