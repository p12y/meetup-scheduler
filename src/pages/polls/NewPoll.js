import React, { useState } from "react";
import { Box, Button, Form, FormField, Calendar, Grid, Text } from "grommet";
import styled from "styled-components";
import { FormNextLink } from "grommet-icons";
import moment from "moment";
import DateBox from "components/poll/DateBox";
import PageTitle from "components/common/PageTitle";

const Container = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  width: 100%;
`;

function NewPoll() {
  const [dates, setDates] = useState([]);

  function setSortedDates(dates) {
    const sortedDates = [...dates].sort((a, b) => moment(a).diff(moment(b)));
    setDates(sortedDates);
  }

  function selectDate(selectedDate) {
    if (dates.find(date => date === selectedDate)) {
      setSortedDates(dates.filter(date => date !== selectedDate));
    } else {
      setSortedDates(dates.concat(selectedDate));
    }
  }

  return (
    <Container>
      <Form onSubmit={event => console.log(event)}>
        <PageTitle basis="xlarge" title="New poll" />
        <Grid
          rows={["auto", "auto"]}
          columns={["1/2", "1/2"]}
          gap="small"
          areas={[
            { name: "form", start: [0, 0], end: [0, 0] },
            { name: "calendar", start: [1, 0], end: [1, 0] },
            { name: "dates", start: [0, 1], end: [1, 1] }
          ]}
        >
          <Box gridArea="form" align="center" justify="center">
            <FormContainer>
              <FormField name="name" label="Name" required />
              <FormField name="location" label="Location" required />
              <FormField name="description" label="Description" as="textarea" />
            </FormContainer>
          </Box>
          <Box gridArea="calendar" align="center" justify="center">
            <Box>
              <Calendar
                daysOfWeek
                size="medium"
                dates={dates}
                onSelect={selectDate}
              />
            </Box>
          </Box>
          <Box gridArea="dates">
            <Text>{dates.length ? "Selected dates" : "No dates selected"}</Text>
            <Box direction="row" pad="small" wrap fill align="center">
              {dates.map(date => (
                <DateBox date={date} key={date} />
              ))}
            </Box>
          </Box>
        </Grid>
        <Box align="end">
          <Button
            disabled={!dates.length}
            label="Continue"
            primary
            type="submit"
            icon={<FormNextLink />}
          />
        </Box>
      </Form>
    </Container>
  );
}

export default NewPoll;
