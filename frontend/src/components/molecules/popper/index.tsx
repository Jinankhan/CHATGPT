import { Popover, PopoverProps } from '@mui/material';
import React from 'react';

interface IPopperProps extends PopoverProps {
  anchor: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  parent: React.ReactNode;
  width: string;
}

const Popper = (props: IPopperProps) => {
  return (
    <Popover
      anchorEl={props.anchor}
      onClose={props.handleClose}
      open={props.open}
      sx={{
        '.css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
          boxShadow: 'none',

          background: 'none',
          width: props.width
        },
        ...props.sx
      }}
    >
      {props.parent}
    </Popover>
  );
};

export default Popper;
