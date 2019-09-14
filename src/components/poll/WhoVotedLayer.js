import React from 'react';
import { Box, Button, Heading, Layer, Text } from 'grommet';
import * as GrommetIcons from 'grommet-icons';
import { useSelector, useDispatch } from 'react-redux';
import { closeWhoVotedLayer } from 'actions/polls';
import {
  ProfileImageButton,
  ImageContainer,
  ProfileImage,
} from 'styled/profileImage';

const defaultProfileImageUrl =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

const WhoVotedLayer = () => {
  const dispatch = useDispatch();
  const open = useSelector(state => state.polls.whoVotedLayerOpen);
  let votes = useSelector(state => state.polls.votes) || [];
  votes = votes.sort(vote => (vote.vote === 'yes' ? -1 : 1));
  const onClose = () => dispatch(closeWhoVotedLayer());

  return (
    <Box fill align="center" justify="center">
      {open && (
        <Layer
          position="right"
          full="vertical"
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            fill="vertical"
            overflow="auto"
            width="medium"
            pad="medium"
            onSubmit={onClose}
          >
            <Box
              flex={false}
              direction="row"
              justify="between"
              margin={{ bottom: 'small' }}
            >
              <Heading level={3} margin="none">
                Who voted
              </Heading>
              <Button icon={<GrommetIcons.Close />} onClick={onClose} plain />
            </Box>
            {votes &&
              votes.map(vote => (
                <Box
                  key={vote.user.email}
                  direction="row"
                  align="center"
                  margin={{ top: 'xsmall', bottom: 'xsmall' }}
                >
                  <ProfileImageButton width="2rem" height="2rem">
                    <ImageContainer>
                      <ProfileImage
                        src={vote.user.photoURL || defaultProfileImageUrl}
                      />
                    </ImageContainer>
                  </ProfileImageButton>
                  <Text margin={{ left: 'xsmall' }}>
                    {vote.user.displayName || vote.user.email}
                  </Text>
                  <Box pad={{ left: 'xsmall' }}>
                    {vote.vote === 'yes' ? (
                      <GrommetIcons.Checkmark size="small" color="status-ok" />
                    ) : (
                      <GrommetIcons.Close
                        size="small"
                        color="status-critical"
                      />
                    )}
                  </Box>
                </Box>
              ))}
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default WhoVotedLayer;
