import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { SOCIAL_ICONS } from '../../../constants';
import React from 'react';

interface ILoginProps {
  handleClick: (value: string) => void;
}
const Login = (props: ILoginProps) => {
  return (
    <Box
      sx={{
        maxWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
      }}
    >
      <Typography variant="h1" fontSize="32px" color="#2D333A">
        Welcome Back
      </Typography>
      <TextField
        fullWidth
        InputProps={{
          style: { color: '#fff' },
          placeholder: 'Email address or phone number*',
          sx: {
            '&::placeholder': {
              color: 'white !important'
            }
          }
        }}
        label="Email address or phone number*"
        placeholder="Email address or phone number*"
        sx={{
          marginTop: '24px',
          '& .MuiInputLabel-root': {
            color: '#6f7780'
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#10A37F'
          },

          '& .MuiOutlinedInput-root': {
            height: '52px',
            '&.Mui-focused fieldset': {
              borderColor: '#10A37F'
            }
          }
        }}
      />
      <Button
        variant="contained"
        disableRipple
        disableTouchRipple
        fullWidth
        sx={{
          background: '#10A37F',
          boxShadow: 'none',
          padding: '4px 16px',
          textTransform: 'none',
          fontSize: '16px',
          borderRadius: '6px',
          height: '52px',
          marginTop: '24px',

          '&:hover': { background: '#10A37F', boxShadow: 'none' }
        }}
      >
        Continue
      </Button>

      <Box sx={{ marginTop: '16px' }}>
        <Typography fontSize="14px" sx={{ display: 'inline' }}>
          Don&apos;t have an account?
          <Typography
            color="#10A37F"
            fontSize="14px"
            sx={{ display: 'inline' }}
          >
            &nbsp;Sign up
          </Typography>
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '4px',
          paddingTop: '24px',
          paddingBottom: '12px'
        }}
      >
        <Divider sx={{ width: '1px', flex: 1 }} />
        <Typography fontSize="12px"> or</Typography>
        <Divider sx={{ width: '1px', flex: 1 }} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {SOCIAL_ICONS.map((item) => {
          return (
            <Stack
              key={item.name}
              sx={{
                padding: '15px',
                border: '1px solid #c2c8d0',
                borderRadius: '6px',
                cursor: 'pointer',
                marginBottom: '8px',
                '&:hover': { background: '#0000001a' }
              }}
              onClick={() => props.handleClick(item.name)}
              direction="row"
              columnGap="4px"
              display="flex"
              justifyContent="flex-start"
            >
              <img src={item.src} alt={item.name} width={20} height={20} />
              <Typography variant="h1" fontSize="16px">
                {item.name}
              </Typography>
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
};

export default Login;
