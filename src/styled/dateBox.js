import styled from 'styled-components';
import { Box } from 'grommet';

export const StarContainer = styled.div`
  padding: 0.2em;
  position: absolute;
  right: 0;
  top: 0;
`;

export const SelectButton = styled(Box)`
  cursor: pointer;
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  margin: 0;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 0;
`;

export const Container = styled(Box)`
  position: relative;
`;
