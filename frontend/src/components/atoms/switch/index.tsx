import {
  FormControlLabel,
  FormGroup,
  Switch as MuiSwitch
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const StyledSwitch = styled(MuiSwitch)({
  '&.MuiSwitch-root': {
    width: 38,
    height: 26,
    padding: 0
  },
  '& .MuiSwitch-switchBase': {
    padding: 0,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(15px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#10A37F',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 19,
    height: 19,
    margin: 3
  },
  '& .MuiSwitch-track': {
    height: '90%',
    borderRadius: 13,
    backgroundColor: '#2f2f2f',
    opacity: 1,
    border: '1px solid hsla(0,0%,100%,.1)'
  }
});

interface ISwitchProps {
  label: string | React.ReactNode;
  handleChange: (value: boolean) => void;
  isChecked: boolean;
}
const Switch = (props: ISwitchProps) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <StyledSwitch
            disableFocusRipple
            disableTouchRipple
            disableRipple
            onChange={(e) => props.handleChange(e.target.checked)}
            checked={props.isChecked}
          />
        }
        label={props.label}
      />
    </FormGroup>
  );
};

export default Switch;
