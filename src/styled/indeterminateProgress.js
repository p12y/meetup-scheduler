import styled, { keyframes, css } from 'styled-components';

export const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
  overflow-x: hidden;
  ${({ sticky }) => sticky && stickyStyle}
  z-index: 99;
`;

export const Line = styled.div`
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

const stickyStyle = css`
  position: sticky;
  top: 0;
`;

export const Inc = styled(Subline)`
  animation: ${increase} 2s infinite;
  background: ${props => props.background};
`;

export const Dec = styled(Subline)`
  animation: ${decrease} 2s 0.5s infinite;
  background: ${props => props.background};
`;
