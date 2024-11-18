import { Box, Stack, Typography } from '@mui/material';
import { PROFILE_MODAL_DATA } from '../../../constants';
import React from 'react';

interface IprofileModalProps {
  handleClick: (name: string) => void;
}
const ProfileModal = (props: IprofileModalProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#2f2f2f',
        borderRadius: '1rem',
        padding: '12px',
        margin: '8px 0px',
        height: '256px',
        border: '1px solid hsla(0,0%,100%,.1)',
        color: 'white'
      }}
    >
      {PROFILE_MODAL_DATA.map((item) => {
        return (
          <>
            {item.name === 'Upgrade Plan' && (
              <Box
                sx={{
                  width: '100%',
                  backgroundColor: 'hsla(0,0%,100%,.1)',
                  padding: '0.5px'
                }}
              />
            )}

            <Box
              key={item.name}
              sx={{
                padding: '8px',
                margin: '8px 0px',
                borderRadius: '5px',
                '&:hover': {
                  background: '#424242'
                },
                cursor: 'pointer'
              }}
              onClick={() => props.handleClick(item.name)}
            >
              <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                <img src={item.src} alt={item.src} width={22} height={22} />
                <Typography
                  color="white"
                  variant="h1"
                  sx={{ fontSize: '14px' }}
                >
                  {item.name}
                </Typography>
              </Stack>
            </Box>
            {item.name === 'Upgrade Plan' && (
              <Box
                sx={{
                  width: '100%',
                  backgroundColor: 'hsla(0,0%,100%,.1)',
                  padding: '0.5px'
                }}
              />
            )}
          </>
        );
      })}
    </Box>
  );
};

export default ProfileModal;
