import React from 'react';
import { Button } from 'grommet';
import { AddCircle } from 'grommet-icons';
import { Link } from 'react-router-dom';

export default () => (
  <Link to="/polls/new">
    <Button primary icon={<AddCircle />} label="New poll" alignSelf="end" />
  </Link>
);
