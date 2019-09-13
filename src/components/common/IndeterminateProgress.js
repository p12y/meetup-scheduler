import React from 'react';
import { base } from 'grommet';
import { Slider, Line, Inc, Dec } from 'styled/indeterminateProgress';
function IndeterminateProgress({ color, sticky }) {
  return (
    <Slider sticky={sticky}>
      <Line background={color} />
      <Inc background={color} />
      <Dec background={color} />
    </Slider>
  );
}

IndeterminateProgress.defaultProps = {
  color: base.global.colors.brand,
};

export default IndeterminateProgress;
