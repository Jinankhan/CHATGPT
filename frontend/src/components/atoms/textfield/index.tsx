import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

interface ITextFieldProps extends OutlinedInputProps {
  multiline?: boolean;
}

const StyledInput = styled(OutlinedInput)<ITextFieldProps>(({ multiline }) => ({
  border: 'none',
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },

  '&.MuiOutlinedInput-root': {
    color: '#e3e3e3',
    borderRadius: '26px',
    height: multiline ? 'auto' : '48px',
    background: '#2f2f2f',
    lineHeight: '1.5',
    padding: '10px',
    '&.Mui-focused fieldset': {
      border: 'none'
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  ...(multiline && {
    height: 'auto',
    overflow: 'auto',
    whiteSpace: 'pre-wrap'
  })
}));

const TextField = (props: ITextFieldProps) => {
  return <StyledInput {...props} fullWidth maxRows={10} multiline />;
};

export default TextField;
