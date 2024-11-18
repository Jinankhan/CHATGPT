import { Box } from '@mui/material';
import React from 'react';

interface IModalBoxProps {
  content: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

const ModalBox = (props: IModalBoxProps) => {
  return (
    props.open && (
      <Box
        sx={{
          display: 'flex',
          width: '100vw',
          height: '100%',
          position: 'absolute',
          background: '#000c',
          left: 0,
          top: 0,

          zIndex: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {props.content}
      </Box>
    )
  );
};

export default ModalBox;
