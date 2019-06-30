import React from "react";
import styled from "styled-components";
import PageTitle from "components/common/PageTitle";
import { Info, Location } from "grommet-icons";
import { Text, Box } from "grommet";
import DateBox from "components/poll/DateBox";

const Container = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 1rem;
`;

const IconContainer = styled.span`
  margin-right: 1em;
`;

const FlexText = styled(Text)`
  display: flex;
`;

function Poll() {
  return (
    <Container>
      <Box pad="small">
        <PageTitle basis="xlarge" title="June meetup" />
        <FlexText as="p">
          <IconContainer>
            <Info />
          </IconContainer>
          June meetup with the lads! Thinking we could go camping.
        </FlexText>
        <FlexText as="p">
          <IconContainer>
            <Location />
          </IconContainer>
          Leicester
        </FlexText>
      </Box>

      <Box direction="row" wrap fill align="center">
        <DateBox date={new Date()} withVotes />
        <DateBox date={new Date()} withVotes />
        <DateBox date={new Date()} withVotes />
      </Box>
    </Container>
  );
}

export default Poll;
