import { Box } from '@mui/material';
import React from 'react';

interface IHomeTemplateProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  content: React.ReactNode;
}

const LoginTemplate = (props: IHomeTemplateProps) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        background: 'white'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          position: 'fixed',
          width: '100%',
          justifyContent: 'center',
          marginTop: '25px'
        }}
      >
        {props.header}
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          zIndex: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        {props.content}
      </Box>
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          textAlign: 'center',
          width: '100%',
          marginBottom: '34px'
        }}
      >
        {props.footer}
      </Box>
    </Box>
  );
};

export default LoginTemplate;
