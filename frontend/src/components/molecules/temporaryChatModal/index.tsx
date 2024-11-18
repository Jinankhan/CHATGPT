import { Box, Stack, Typography } from '@mui/material';
import { CUSTOMIZE_CHATGPT } from '../../../constants';
import Chip from '../../atoms/chip/index';
import Switch from '../../atoms/switch/index';
import React from 'react';

const getComponent = (
  component: {
    name: string;
    content: string;
    src: string;
  },
  handleChange: (value: boolean) => void,
  isChecked: boolean
) => {
  switch (component.name) {
    case 'icon':
      return (
        <img src={component.src} height={18} width={18} alt={component.name} />
      );

    case 'chip':
      return (
        <Chip
          label={component.content}
          background="#2f2f2f"
          chipcolor="white"
        />
      );
    case 'switch':
      return (
        <Switch
          label={component.content}
          handleChange={(value: boolean) => handleChange(value)}
          isChecked={isChecked}
        />
      );
  }
};

interface ITemporryChatModalProps {
  isChecked: boolean;
  handleChange: (value: boolean) => void;
}
const TemporaryChatModal = (props: ITemporryChatModalProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '191px',
        background: '#2f2f2f',
        color: 'white',
        padding: '8px 0px',
        border: '1px solid hsla(0,0%,100%,.1)',
        borderRadius: '1rem'
      }}
    >
      {CUSTOMIZE_CHATGPT.map((item) => {
        return (
          <>
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '191px',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '0px 8px',
                padding: '12px',
                borderRadius: '.375rem',
                '&:hover': {
                  background: '#424242'
                },
                cursor: 'pointer'
              }}
            >
              <Stack direction="row" columnGap="10px" alignItems="center">
                {!item.title.includes('Temporary') ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#424242'
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      width={16}
                      height={16}
                    />
                  </Box>
                ) : (
                  <img src={item.src} alt={item.title} width={20} height={20} />
                )}

                <Stack rowGap="3px">
                  <Typography variant="h1" fontSize="14px">
                    {item.title}
                  </Typography>
                  <Typography variant="h2" fontSize="12px">
                    {item.caption}
                  </Typography>
                </Stack>
              </Stack>
              {getComponent(
                item.component,
                props.handleChange,
                props.isChecked
              )}
            </Box>
            {item.caption.includes('tasks') && (
              <Box
                sx={{
                  width: '100%',
                  backgroundColor: 'hsla(0,0%,100%,.1)',
                  padding: '0.5px',
                  margin: '8px 0px'
                }}
              />
            )}
          </>
        );
      })}
    </Box>
  );
};

export default TemporaryChatModal;
