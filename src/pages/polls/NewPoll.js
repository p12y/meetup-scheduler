import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Calendar,
  Grid,
  Text,
  ResponsiveContext,
} from 'grommet';
import styled from 'styled-components';
import { FormNextLink } from 'grommet-icons';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import DateBox from 'components/poll/DateBox';
import PageTitle from 'components/common/PageTitle';
import { createPoll } from 'actions/polls';

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  width: 80%;
`;

const FormContainer = styled.div`
  width: 100%;
`;

function NewPoll({ history }) {
  const size = useContext(ResponsiveContext);
  const dispatch = useDispatch();
  const [dates, setDates] = useState([]);
  const currentUser = useSelector(state => state.auth.currentUser);

  function setSortedDates(dates) {
    const sortedDates = [...dates].sort((a, b) => moment(a).diff(moment(b)));
    setDates(sortedDates);
  }

  function selectDate(selectedDate) {
    if (dates.find(date => date === selectedDate)) {
      setDates(dates.filter(date => date !== selectedDate));
    } else {
      setSortedDates(dates.concat(selectedDate));
    }
  }

  const handleSubmit = async event => {
    const form = event.value;
    dispatch(
      createPoll({
        history,
        dates,
        createdBy: currentUser.uid,
        name: form.name,
        location: form.location,
        description: form.description || '',
      })
    );
  };

  return (
    <Container>
      <PageTitle title="New poll" />
      <Form onSubmit={handleSubmit}>
        <Grid
          rows={size === 'small' ? ['auto', 'auto', 'auto'] : ['auto']}
          columns={size === 'small' ? ['full'] : ['1/2', '1/2']}
          gap="small"
        >
          <Box align="center" justify="center">
            <FormContainer>
              <FormField name="name" label="Name" required />
              <FormField name="location" label="Location" required />
              <FormField name="description" label="Description" as="textarea" />
            </FormContainer>
          </Box>
          <Box align={size === 'small' ? 'start' : 'center'} justify="center">
            <Box
              margin={{
                top: size === 'small' ? 'medium' : 'none',
                bottom: size === 'small' ? 'medium' : 'none',
              }}
            >
              <Calendar
                daysOfWeek
                size={size === 'small' ? 'small' : 'medium'}
                dates={dates}
                onSelect={selectDate}
                alignSelf="start"
              />
            </Box>
          </Box>
        </Grid>
        <Box>
          <Text margin={{ bottom: 'medium' }}>
            {dates.length ? 'Selected dates' : 'No dates selected'}
          </Text>
          <Box
            direction="row"
            wrap
            fill
            align="center"
            justify={size === 'small' ? 'center' : 'stretch'}
          >
            {dates.map(date => (
              <DateBox date={date} key={date} />
            ))}
          </Box>
        </Box>
        <Box align="end" margin={{ top: 'medium' }}>
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

export default withRouter(NewPoll);
