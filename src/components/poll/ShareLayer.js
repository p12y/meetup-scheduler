import React, { useRef, useState, useEffect } from 'react';
import { Layer, Button, Box, TextInput, Heading, Paragraph } from 'grommet';
import { Copy } from 'grommet-icons';

function ShareLayer({ open, onClose, shareUrl }) {
  const urlInputRef = useRef();
  const [copyText, setCopyText] = useState('Copy');

  const handleCopy = () => {
    if (urlInputRef.current) {
      urlInputRef.current.select();
      urlInputRef.current.setSelectionRange(0, 999);
      document.execCommand('copy');
      setCopyText('Copied!');
      setTimeout(() => {
        onClose();
        setCopyText('Copy');
      }, 300);
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      {open && (
        <Layer onEsc={onClose} onClickOutside={onClose}>
          <Box
            pad={{
              top: 'medium',
              right: 'medium',
              left: 'medium',
              bottom: 'small',
            }}
          >
            <Heading level={3} alignSelf="center" margin="small">
              Share URL
            </Heading>
            <Paragraph>Copy the URL below, to share with others.</Paragraph>
            <TextInput ref={urlInputRef} value={shareUrl} />
            <Box
              pad={{ top: 'medium' }}
              fill="horizontal"
              justify="end"
              direction="row"
            >
              <Button
                margin={{ right: 'xsmall' }}
                label="Cancel"
                onClick={onClose}
              />
              <Button
                label={copyText}
                primary
                onClick={handleCopy}
                icon={<Copy />}
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
}

export default ShareLayer;
