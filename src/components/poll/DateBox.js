import React from "react";
import { Box, Text, Anchor } from "grommet";
import moment from "moment";
import styled from "styled-components";
import { Like, Dislike } from "grommet-icons";

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

function DateBox({ date, withVotes }) {
  const momentDate = moment(date);

  const month = momentDate.format("MMM");
  const dayOfMonth = momentDate.format("D");
  const dayOfWeek = momentDate.format("dddd");

  return (
    <Box
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
    </Box>
  );
}

export default DateBox;
