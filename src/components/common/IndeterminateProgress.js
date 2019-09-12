import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { base } from 'grommet';

const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
  overflow-x: hidden;
  ${({ sticky }) => sticky && stickyStyle}
  z-index: 99;
`;

const Line = styled.div`
  position: absolute;
  opacity: 0.4;
  background: ${props => props.background};
  width: 150%;
  height: 5px;
`;

const Subline = styled.div`
  position: absolute;
  background: #4a8df8;
  height: 5px;
  animation-timing-function: ease-in-out;
`;

const increase = keyframes`
  from { left: -5%; width: 5%; }
  to { left: 130%; width: 100%;}
`;
const decrease = keyframes`
  from { left: -80%; width: 80%; }
  to { left: 110%; width: 10%;}
`;

const Inc = styled(Subline)`
  animation: ${increase} 2s infinite;
  background: ${props => props.background};
`;

const Dec = styled(Subline)`
  animation: ${decrease} 2s 0.5s infinite;
  background: ${props => props.background};
`;

const stickyStyle = css`
  position: sticky;
  top: 0;
`;

const IndeterminateProgress = ({ color, sticky }) => {
  return (
    <Slider sticky={sticky}>
      <Line background={color} />
      <Inc background={color} />
      <Dec background={color} />
    </Slider>
  );
};

IndeterminateProgress.defaultProps = {
  color: base.global.colors.brand,
};

export default IndeterminateProgress;
