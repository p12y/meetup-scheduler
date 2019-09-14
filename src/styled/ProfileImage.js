import styled from 'styled-components';

export const ProfileImageButton = styled.div`
  border-radius: 50%;
  background: white;
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

ProfileImageButton.defaultProps = {
  width: '3rem',
  height: '3rem',
};

export const ImageContainer = styled.div`
  border-radius: 50%;
  background: silver;
  width: 90%;
  height: 90%;
  overflow: hidden;
`;

export const ProfileImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
