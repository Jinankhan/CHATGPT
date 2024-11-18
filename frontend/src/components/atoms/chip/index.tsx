import {
  Chip as MuiChip,
  ChipProps as MuiChipprops,
  styled
} from '@mui/material';
import React from 'react';

const StyledChip = styled(MuiChip)((props: IChipProps) => ({
  border: '1px solid hsla(0,0%,100%,.1)',
  color: props.chipcolor,
  cursor: 'pointer',
  fontSize: '13px',
  '&.MuiChip-root': {
    padding: '18px 5px'
  },
  background: props.background
}));

interface IChipProps extends MuiChipprops {
  background: string;
  chipcolor: string;
}
const Chip = (props: IChipProps) => {
  return <StyledChip {...props} />;
};

export default Chip;
