import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heading, Box, Paragraph, Button, Text } from 'grommet';
import { Redirect } from 'react-router-dom';
import { ShareOption, Gift } from 'grommet-icons';
import DateBox from 'components/poll/DateBox';
import { openLoginLayer } from 'actions/auth';

const createDemoVotes = () =>
  Array(10)
    .fill(1)
    .map((_, index) => ({ vote: index < 8 ? 'yes' : 'no', user: {} }));

export default () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);

  if (currentUser) return <Redirect to="/dashboard" />;

  return (
    <Box margin={{ bottom: 'medium' }}>
      <Box margin="medium">
        <Heading
          margin={{ top: 'large', bottom: 'small' }}
          textAlign="center"
          alignSelf="center"
          color="dark-2"
          level={1}
        >
          Find out the best day to meet
        </Heading>
        <Paragraph
          alignSelf="center"
          textAlign="center"
          size="xlarge"
          color="dark-2"
        >
          Create a poll to find the date that works best for everyone
        </Paragraph>
      </Box>
      <Box direction="row" wrap fill justify="center" align="center">
        <DateBox
          isDemo
          date={new Date()}
          withVotes
          top
          votes={createDemoVotes()}
        />
      </Box>
      <Box
        direction="row"
        background="light-1"
        pad="medium"
        margin={{ top: 'large' }}
      >
        <Box width="50%" align="center" pad="small" wrap>
          <ShareOption color="accent-1" size="xlarge" />
          <Heading
            margin={{ bottom: 'xsmall' }}
            textAlign="center"
            alignSelf="center"
            color="dark-2"
            level={2}
          >
            Share with friends
          </Heading>
          <Paragraph
            alignSelf="center"
            textAlign="center"
            size="medium"
            color="dark-2"
          >
            Create a link to share with your friends
          </Paragraph>
        </Box>
        <Box width="50%" align="center" pad="small" wrap>
          <Gift color="accent-1" size="xlarge" />
          <Heading
            margin={{ bottom: 'xsmall' }}
            textAlign="center"
            alignSelf="center"
            color="dark-2"
            level={2}
          >
            Free forever
          </Heading>
          <Paragraph
            alignSelf="center"
            textAlign="center"
            size="medium"
            color="dark-2"
          >
            Create unlimited polls for free. Forever!
          </Paragraph>
        </Box>
      </Box>
      <Heading
        margin={{ top: 'large', bottom: 'small' }}
        textAlign="center"
        alignSelf="center"
        color="dark-2"
        level={2}
      >
        Start polling!
      </Heading>
      <Paragraph
        alignSelf="center"
        textAlign="center"
        size="medium"
        color="dark-2"
      >
        Arranging a meetup with friends and don't know what date is best?
      </Paragraph>
      <Paragraph alignSelf="center" textAlign="center" size="large">
        <Button
          onClick={() => dispatch(openLoginLayer())}
          primary
          label={<Text size="large">Create a poll</Text>}
          alignSelf="end"
        />
      </Paragraph>
    </Box>
  );
};
