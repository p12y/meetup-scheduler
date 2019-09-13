import React from 'react';
import IndeterminateProgress from 'components/common/IndeterminateProgress';

function AsyncProgressComponent({ isLoading, children, isPerformingAsync }) {
  if (isLoading) return <IndeterminateProgress />;
  return (
    <>
      {isPerformingAsync && <IndeterminateProgress sticky />}
      {children}
    </>
  );
}

export default AsyncProgressComponent;
