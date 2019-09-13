import React from 'react';
import { Button } from 'grommet';
import { useDispatch } from 'react-redux';
import { cancelMailSignIn } from 'actions/auth';
import styled from 'styled-components';

const ButtonGroup = styled.div`
  text-align: right;
`;

function ActionButtons({ cancelText, showCancel, nextAction, nextText }) {
  const dispatch = useDispatch();
  return (
    <ButtonGroup>
      {showCancel && (
        <Button
          margin="small"
          label={cancelText}
          onClick={() => dispatch(cancelMailSignIn())}
        />
      )}
      <Button label={nextText} primary onClick={nextAction} />
    </ButtonGroup>
  );
}

ActionButtons.defaultProps = {
  cancelText: 'Cancel',
  nextText: 'Next',
  showCancel: true,
};

export default ActionButtons;
