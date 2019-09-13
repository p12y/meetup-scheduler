import React, { useEffect } from 'react';
import styled from 'styled-components';
import LoaderSvg from 'img/loader.svg';

const LoaderContainer = styled.div`
  align-items: center;
  background: white;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 999;
`;

function FullPageLoader({ visible }) {
  useEffect(() => {
    const bodyStyle = document.querySelector('body').style;
    bodyStyle.overflow = 'hidden';
    return () => (bodyStyle.overflow = 'initial');
  }, []);

  return (
    <LoaderContainer>
      <img src={LoaderSvg} alt="loading" />
    </LoaderContainer>
  );
}

export default FullPageLoader;
