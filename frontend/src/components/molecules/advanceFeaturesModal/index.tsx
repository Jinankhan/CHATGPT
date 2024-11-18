import { Box, Button, Typography } from '@mui/material';
import React from 'react';
interface IAdvancedModalProps {
  handleClick: () => void;
}
const AdvancedFeaturesModal = (props: IAdvancedModalProps) => {
  return (
    <Box
      sx={{
        background: '2F2F2F',
        border: '1px solid hsla(0,0%,100%,.1)',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '1rem',
        padding: '16px',
        maxWidth: '340px',
        height: '140px'
      }}
    >
      <Typography
        variant="h2"
        fontSize="16px"
        color="#F9F9F9"
        marginTop="6px"
        fontWeight={530}
      >
        Log in to try advanced features
      </Typography>
      <Typography variant="h1" fontSize="14px" color="#E3E3E3" marginTop="6px">
        Get smarter responses, upload files, analyze images, and more by logging
        in.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          marginTop: '30px',
          height: '38px'
        }}
      >
        <Button
          disableFocusRipple
          disableTouchRipple
          sx={{
            background: '#fff',
            color: '#0D0D0D',
            fontWeight: 500,
            textTransform: 'none',
            padding: '8px 14px',
            borderRadius: 99999,
            '&:hover': { background: '#fff' },
            boxShadow: 'none',
            fontSize: '14px'
          }}
          onClick={() => props.handleClick()}
        >
          Login
        </Button>
        <Button
          disableFocusRipple
          disableTouchRipple
          sx={{
            background: '#212121',
            border: '1px solid hsla(0,0%,100%,.1)',
            color: '#ECECEC',
            textTransform: 'none',
            padding: '8px 14px',
            borderRadius: 99999,
            '&:hover': { background: '#212121' },
            boxShadow: 'none',
            fontSize: '14px'
          }}
          onClick={() => props.handleClick()}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default AdvancedFeaturesModal;
