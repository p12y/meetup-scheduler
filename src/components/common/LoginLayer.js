import React, { useState } from "react";
import { Box, Button, Heading, Layer } from "grommet";
import * as GrommetIcons from "grommet-icons";
import LoginButton from "./LoginButton";

const providers = ["Facebook", "Google", "Twitter", "Mail"];

function LoginLayer() {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <Box fill align="center" justify="center">
      {open && (
        <Layer
          position="right"
          full="vertical"
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            fill="vertical"
            overflow="auto"
            width="medium"
            pad="medium"
            onSubmit={onClose}
          >
            <Box flex={false} direction="row" justify="between">
              <Heading level={3} margin="none">
                Sign in to vote!
              </Heading>
              <Button icon={<GrommetIcons.Close />} onClick={onClose} />
            </Box>
            {providers.map(provider => (
              <LoginButton
                provider={provider}
                key={provider}
                onClick={console.log}
                icon={React.createElement(GrommetIcons[provider], {
                  color: "plain"
                })}
              />
            ))}
          </Box>
        </Layer>
      )}
    </Box>
  );
}

export default LoginLayer;
