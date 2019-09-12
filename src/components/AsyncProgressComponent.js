import React from 'react';
import IndeterminateProgress from 'components/common/IndeterminateProgress';

export default ({ isLoading, children, isPerformingAsync }) => {
  if (isLoading) return <IndeterminateProgress />;
  return (
    <>
      {isPerformingAsync && <IndeterminateProgress sticky />}
      {children}
    </>
  );
};
