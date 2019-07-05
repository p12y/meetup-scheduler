import React from "react";
import { Box, Text, Anchor } from "grommet";
import moment from "moment";
import styled from "styled-components";
import { Like, Dislike, Star } from "grommet-icons";

const StarContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.2em;
`;

const SelectButton = styled(Box)`
  cursor: pointer;
`;

const ButtonContent = styled.span`
  display: inline-flex;
  padding: 0;
  margin: 0;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

const Container = styled(Box)`
  position: relative;
`;

function DateBox({ date, withVotes, top }) {
  const momentDate = moment(date);

  const month = momentDate.format("MMM");
  const dayOfMonth = momentDate.format("D");
  const dayOfWeek = momentDate.format("dddd");

  return (
    <Container
      elevation="medium"
      background="brand"
      color="light"
      round="medium"
      width="auto"
      pad="small"
      align="center"
      margin="small"
      basis="small"
    >
      {top && (
        <StarContainer>
          <Star color="accent-4" size="large" />
        </StarContainer>
      )}
      <Text weight="bold" margin="xsmall">
        {month}
      </Text>
      <Text margin="xsmall" weight="bold" size="xxlarge">
        {dayOfMonth}
      </Text>
      <Text margin="xsmall">{dayOfWeek}</Text>
      {withVotes && (
        <>
          <Box direction="row" fill>
            <SelectButton
              fill
              pad="small"
              background="accent-1"
              margin="xsmall"
              round="small"
            >
              <Box direction="row" justify="around">
                <ButtonContent>3</ButtonContent>
                <ButtonContent>
                  <Like />
                </ButtonContent>
              </Box>
            </SelectButton>
            <SelectButton
              fill
              pad="small"
              background="light-3"
              margin="xsmall"
              round="small"
            >
              <Box direction="row" justify="around">
                <ButtonContent>1</ButtonContent>
                <ButtonContent>
                  <Dislike />
                </ButtonContent>
              </Box>
            </SelectButton>
          </Box>
          <Anchor>See who voted</Anchor>
        </>
      )}
    </Container>
  );
}

export default DateBox;
