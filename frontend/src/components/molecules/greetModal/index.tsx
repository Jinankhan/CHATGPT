import { Box, Button, Link, Typography } from '@mui/material';
import React from 'react';

interface IGreetModalProps {
  handleAuth: () => void;
  handleClose: () => void;
}
const GreetModal = (props: IGreetModalProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        maxWidth: '320px',
        height: '300px',
        textAlign: 'center',
        background: '#2F2F2F',
        borderRadius: '1rem'
      }}
    >
      <Typography
        color="white"
        fontSize="24px"
        fontWeight={600}
        marginBottom="4px"
      >
        Welcome Back
      </Typography>
      <Typography color="#E3E3E3" fontSize="18px" marginBottom="24px">
        Log in or sign up to get smarter responses, upload files and images, and
        more.
      </Typography>
      <Button
        disableFocusRipple
        disableTouchRipple
        sx={{
          background: '#fff',
          color: '#0D0D0D',
          textTransform: 'none',
          padding: '12px 16px',
          borderRadius: 99999,
          '&:hover': { background: '#fff' },
          boxShadow: 'none',
          marginBottom: '20px',
          fontSize: '.875rem'
        }}
        onClick={() => props.handleAuth()}
        fullWidth
      >
        Login
      </Button>
      <Button
        disableFocusRipple
        fullWidth
        disableTouchRipple
        sx={{
          background: '#2F2F2F',
          border: '1px solid hsla(0,0%,100%,.1)',
          color: '#ECECEC',
          textTransform: 'none',
          padding: '12px 16px',
          marginBottom: '20px',
          borderRadius: 99999,
          '&:hover': { background: '#3E3E3E' },
          boxShadow: 'none',
          fontSize: '.875rem'
        }}
        onClick={() => props.handleAuth()}
      >
        Sign up
      </Button>

      <Link
        color="#E3E3E3"
        onClick={() => props.handleClose()}
        fontSize="14px"
        sx={{ cursor: 'pointer' }}
      >
        Stay logged out
      </Link>
    </Box>
  );
};

export default GreetModal;
