import { Box } from '@mui/material';
import React from 'react';
import Sidebar from '../../components/organisms/sidebar';
interface IHomeTemplateProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  content: React.ReactNode;
  height: string;
}

const HomeTemplate = (props: IHomeTemplateProps) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100svh',
        display: 'flex'
      }}
    >
      <Sidebar />
      <Box
        sx={{
          width: '100vw',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ height: '10%', zIndex: 1, marginBottom: '25px' }}>
          {props.header}
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            zIndex: 0,
            display: 'flex',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          {props.content}
        </Box>
        <Box
          sx={{
            bottom: 0,
            textAlign: 'center',
            width: '100%',
            background: '#212121',
            paddingBottom: '5px'
          }}
        >
          {props.footer}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeTemplate;
