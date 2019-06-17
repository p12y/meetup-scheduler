import React from "react";
import { Box, Text } from "grommet";
import moment from "moment";

function DateBox({ date }) {
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
    </Box>
  );
}

export default DateBox;
