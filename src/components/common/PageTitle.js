import React from 'react';
import { Box, Heading } from 'grommet';
import PropTypes from 'prop-types';

function PageTitle({ title, size }) {
  return (
    <Box justify="center" direction="row">
      <Box direction="row" align="center" justify="center" basis="full">
        <Heading size={size} color="dark-2">
          {title}
        </Heading>
      </Box>
    </Box>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.string,
};

PageTitle.defaultProps = {
  size: 'medium',
};

export default PageTitle;
